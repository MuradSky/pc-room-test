import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createRoomsSlice } from "./rooms";
import { createTablesSlice } from "./tables";
import { RootStoreState } from "./types";


export const useRootStore = create<RootStoreState>()(
    persist(
        (...a)=> ({
            ...createRoomsSlice(...a),
            ...createTablesSlice(...a)
        }),
        {
            name: 'pc-club',
            storage: createJSONStorage(()=> localStorage)
        }
    )
)