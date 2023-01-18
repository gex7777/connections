import { create } from "zustand";
import { User } from "../components/UsersGrid";
import { persist } from "zustand/middleware";
type EditModalP = {
  id: string;
  data: Partial<User>;
};
type State = {
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
export const useStore = create<State>()(
  persist(
    (set) => ({
      users: [],
      showModal: false,
      userIdToEdit: null,
      setUserIdToEdit: (payload) =>
        set(() => ({ userIdToEdit: payload, showModal: true })),
      addUser: (payload) =>
        set((state) => ({ users: addUser(payload, state.users) })),
      deleteUser: (payload) =>
        set((state) => ({
          users: deleteUser(payload, state.users),
        })),
      setShowModal: (payload) => set({ showModal: payload }),
      editUser: ({ id, data }) =>
        set((state) => ({
          users: updateUser(id, data, state.users),
          userIdToEdit: null,
          showModal: false,
        })),
    }),
    { name: "users" }
  )
);
