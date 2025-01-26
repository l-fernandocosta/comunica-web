import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  isOpen: boolean;
}

type Actions = {
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useSidebar = create(
  persist<State & Actions>((set, get) => ({
    isOpen: false, 
    close: () => set({ isOpen: false }),
    open: () => set({ isOpen: true }),
    toggle: () => set({ isOpen: !get().isOpen }),
  }),  {name: 'sidebar-store'})
)
