import { create } from "zustand";

interface AuthFlowState {
    isVerifying: boolean;
    startVerification: () => void;
    endVerification: () => void;
}

export const useAuthFlow = create<AuthFlowState>((set) => ({
    isVerifying: true,
    startVerification: () => set({ isVerifying: true }),
    endVerification: () => set({ isVerifying: false }),
}));
