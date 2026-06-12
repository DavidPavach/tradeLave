import { create } from "zustand";

type Sector = "cryptocurrency" | "stocks";

type SectorState = {
    selectedSector: Sector;
    setSector: (sector: string) => void;
    toggleSector: () => void;
    resetSector: () => void;
};

const useSectorStore = create<SectorState>((set) => ({
    selectedSector: "cryptocurrency",

    setSector: (sector: string) => {
        const normalized = String(sector).toLowerCase() as Sector | string;
        if (normalized !== "cryptocurrency" && normalized !== "stocks") {
            return;
        }
        set({ selectedSector: normalized as Sector });
    },

    toggleSector: () => {
        set((state) => ({
            selectedSector: state.selectedSector === "cryptocurrency" ? "stocks" : "cryptocurrency",
        }));
    },

    resetSector: () => set({ selectedSector: "cryptocurrency" }),
}));

export default useSectorStore;
