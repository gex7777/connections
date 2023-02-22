import { create } from "zustand";
import { User } from "../components/UsersGrid";
import { persist } from "zustand/middleware";
import { Graph, MutableUnweightedGraph, GraphUtil } from "graphs-for-js";

type EditModalP = {
  id: string;
  data: Omit<User, "id">;
};
type State = {
  graph: MutableUnweightedGraph<string, never>;
  showModal: boolean;
  users: User[];
  userIdToEdit: string | null;
  editUser: (payload: EditModalP) => void;
  setShowModal: (payload: boolean) => void;
  setUserIdToEdit: (payload: string | null) => void;
  addUser: (payload: User) => void;
  deleteUser: (payload: string) => void;
  selectedUsers: string[];
  addSelected: (payload: User) => void;
};
function updateUser(
  id: string,
  data: Omit<User, "id">,
  userArray: User[]
): User[] {
  const newUpdatedData = <User[]>userArray.map((user) => {
    if (user.id === id) {
      console.log({ id, ...data });
      return { id, ...data };
    }
    return user;
  });

  console.log(newUpdatedData);
  if (newUpdatedData) {
    for (const s of data.friends) {
      newUpdatedData.forEach((user) => {
        if (user.id === s) {
          if (!user.friends.includes(id)) {
            user.friends.push(id);
          }
        }
      });
    }
    return newUpdatedData;
  }
  return userArray;
}

function deleteUser(id: string, userArray: User[]): User[] {
  return userArray
    .filter((user) => user.id !== id)
    .map((user) => ({
      ...user,
      friends: user.friends.filter((friendId) => friendId !== id),
    }));
}
function addUser(data: User, userArray: User[]): User[] {
  for (const s of data.friends) {
    userArray.forEach((user) => {
      if (user.id === s) {
        if (!user.friends.includes(data.id)) {
          user.friends.push(data.id);
        }
      }
    });
  }
  console.log(userArray);

  return [...userArray, data];
}

function addSelected(data: User, selectedArray: string[]) {
  if (selectedArray.includes(data.id)) {
    console.log(data, selectedArray);
    console.log("dta inside");
    let arr = selectedArray.filter((e) => e !== data.id);
    console.log(arr);
    return [...arr];
  }
  if (selectedArray.length == 2) {
    return [data.id];
  }
  selectedArray.push(data.id);
  return [...selectedArray];
}

function addNode(
  graph: MutableUnweightedGraph<string, never>,
  payload: User
): MutableUnweightedGraph<string, never> {
  graph.insert(payload.id);
  if (payload.friends.length !== 0) {
    payload.friends.map((friend) => {
      graph.connect(friend, payload.id);
    });
  }
  return graph;
}
function deleteNode(
  graph: MutableUnweightedGraph<string, never>,
  id: string
): MutableUnweightedGraph<string, never> {
  graph.remove(id);
  return graph;
}
function editNode(
  graph: MutableUnweightedGraph<string, never>,
  id: string,
  data: Omit<User, "id">
): MutableUnweightedGraph<string, never> {
  console.log(graph);

  if (data.friends?.length !== 0) {
    graph.remove(id);
    graph.insert(id);
    data.friends?.map((friend) => {
      graph.connect(friend, id);
    });
  }
  return graph;
}
export const useStore = create<State>()(
  persist(
    (set) => ({
      graph: new Graph<string>().keyFn((i) => `${i}`).undirected.unweighted(),
      users: [],
      selectedUsers: [],
      showModal: false,
      userIdToEdit: null,
      addSelected: (payload: User) =>
        set((state) => ({
          selectedUsers: addSelected(payload, state.selectedUsers),
        })),
      setUserIdToEdit: (payload) =>
        set(() => ({ userIdToEdit: payload, showModal: true })),
      addUser: (payload) =>
        set((state) => ({
          users: addUser(payload, state.users),
          graph: addNode(state.graph, payload),
        })),
      deleteUser: (payload) =>
        set((state) => ({
          users: deleteUser(payload, state.users),
          graph: deleteNode(state.graph, payload),
        })),
      setShowModal: (payload) => set({ showModal: payload }),
      editUser: ({ id, data }) =>
        set((state) => ({
          users: updateUser(id, data, state.users),
          graph: editNode(state.graph, id, data),
          userIdToEdit: null,
          showModal: false,
        })),
    }),
    {
      name: "users",
      serialize: (state) => {
        return JSON.stringify({
          ...state,
          state: {
            ...state.state,
            graph: GraphUtil.serialize.stringify(state.state.graph),
          },
        });
      },
      deserialize: (value) => {
        const data = JSON.parse(value);
        data.state.graph = GraphUtil.serialize.parse(data.state.graph);
        return data;
      },
    }
  )
);
