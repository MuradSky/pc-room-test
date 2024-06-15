export interface Room {
    id: string
    title: string,
}

export type RoomId = string | null

export interface RoomsState {
    rooms: Room[],
    selectRoomId: RoomId
    removeRoom: (id: RoomId) => void
    addRoom: (data: Room)=> void
    addSelectRoomID: (data: RoomId)=> void
}