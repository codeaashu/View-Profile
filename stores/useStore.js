import { create } from "zustand";

const useStore = create((set) => ({
  // count: 0,
  // increment: () => set((state) => ({ count: state.count + 1 })),
  user: null,
  session: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
