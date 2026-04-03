import { create } from "zustand";

type Sector = "investment" | "stocks";

type SectorState = {
    selectedSector: Sector;
    setSector: (sector: string) => void;
    toggleSector: () => void;
    resetSector: () => void;
};

const useSectorStore = create<SectorState>((set) => ({
    selectedSector: "investment",

    setSector: (sector: string) => {
        const normalized = String(sector).toLowerCase() as Sector | string;
        if (normalized !== "investment" && normalized !== "stocks") {
            return;
        }
        set({ selectedSector: normalized as Sector });
    },

    toggleSector: () => {
        set((state) => ({
            selectedSector: state.selectedSector === "investment" ? "stocks" : "investment",
        }));
    },

    resetSector: () => set({ selectedSector: "investment" }),
}));

export default useSectorStore;
