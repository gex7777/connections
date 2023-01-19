import { create } from "zustand";
import { User } from "../components/UsersGrid";
import { persist } from "zustand/middleware";
import Graph from "@newdash/graphlib";

type EditModalP = {
  id: string;
  data: Partial<User>;
};
type State = {
  graph: Graph;
  showModal: boolean;
  users: User[];
  userIdToEdit: string | null;
  editUser: (payload: EditModalP) => void;
  setShowModal: (payload: boolean) => void;
  setUserIdToEdit: (payload: string) => void;
  addUser: (payload: User) => void;
  deleteUser: (payload: string) => void;
};
function updateUser(
  id: string,
  data: Partial<User>,
  userArray: User[]
): User[] {
  const newUpdatedData = <User[]>userArray.map((user) => {
    if (user.id === id) {
      return { id, ...data };
    }
    return user;
  });
  console.log(newUpdatedData);
  if (newUpdatedData) {
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
  return [...userArray, data];
}
function addNode(graph: Graph, payload: User): Graph {
  graph.setNode(payload.id, { ...payload });
  if (payload.friends.length !== 0) {
    payload.friends.map((friend) => {
      graph.setEdge(friend, payload.id);
    });
  }
  return graph;
}
function deleteNode(graph: Graph, id: string): Graph {
  graph.removeNode(id);
  return graph;
}
function editNode(graph: Graph, id: string, data: Partial<User>): Graph {
  graph.setNode(id, { id, ...data });
  if (data.friends?.length !== 0) {
    data.friends?.map((friend) => {
      graph.setEdge(friend, id);
    });
  }
  return graph;
}
export const useStore = create<State>()(
  persist(
    (set) => ({
      graph: new Graph(),
      users: [],
      showModal: false,
      userIdToEdit: null,
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
    { name: "users" }
  )
);
