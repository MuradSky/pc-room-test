import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createRoomsSlice } from "./rooms";
import { createTablesSlice } from "./tables";
import { createAreas } from "./areas";
import { RootStoreState } from "./types";


export const useRootStore = create<RootStoreState>()(
    persist(
        (...a)=> ({
            ...createRoomsSlice(...a),
            ...createTablesSlice(...a),
            ...createAreas(...a)
        }),
        {
            name: 'pc-club',
            storage: createJSONStorage(()=> localStorage)
        }
    )
)