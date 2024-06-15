import { StateCreator } from "zustand";
import { TableItemsData, TablesState } from "./types";
import {
    addEntityMiddleware,
    addRoomByIdMiddleware,
    addSelectTableIdMiddleware,
    addTableMiddleware,
    removeRoomByIdMiddleware
} from "./middlewares";

export const createTablesSlice: StateCreator<TablesState> = (set, get)=> ({
    tables: [],
    selectTableId: null,

    addRoomById(id) {
        set(addRoomByIdMiddleware(id, get()))
    },
    removeRoomById(id) {
        set(removeRoomByIdMiddleware(id, get()))
    },
    addTable({ roomId, data }: { roomId: string, data: TableItemsData }) {
        set(addTableMiddleware(roomId, data, get()))
    },
    addSelectTableId(roomId, id) {
        set(addSelectTableIdMiddleware(roomId, id, get()))
    },
    addEntity(data: any) {
        set(addEntityMiddleware(data, get()))
    }
})