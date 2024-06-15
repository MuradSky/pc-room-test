import { addRoomMiddleware, removeRoomMiddleware } from "./middlewares";
import { RoomsState } from "./types";
import { StateCreator } from "zustand";

export const createRoomsSlice: StateCreator<RoomsState> = (set, get) => ({
    rooms: [],
    selectRoomId: null,
    removeRoom(id) {
        set(removeRoomMiddleware(id, get()))
    },
    addRoom(data) {
        set(addRoomMiddleware(data, get()))
    },
    addSelectRoomID(selectRoomId) {
        set({ selectRoomId })
    }
})