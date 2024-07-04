import { create } from 'zustand'


export const useInputStore = create((set) => ({
    input: '',
    
    updateInput: (newValue) => set(() => ({
        input: newValue,
    })),
}))