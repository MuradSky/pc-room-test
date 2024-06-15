import { Room, RoomId } from "./types";

type TRoomReturnType = { rooms: Room[], selectRoomId: RoomId }

type TAddRoom = (data: Room, { rooms }: { rooms: Room[] }) => TRoomReturnType

export const addRoomMiddleware = (...[data, { rooms }]: Parameters<TAddRoom>): TRoomReturnType=> {
    rooms.push(data)
    return {
        rooms,
        selectRoomId: data.id,
    }
}



type TRemoveRoom = (
    id: RoomId,
    { rooms, selectRoomId } : { rooms: Room[], selectRoomId: RoomId }
) => TRoomReturnType

export const removeRoomMiddleware = (...[id, { rooms, selectRoomId }]: Parameters<TRemoveRoom>): TRoomReturnType=> {
    const filtered = rooms.filter((item: any)=> item.id !== id)
    const isExists = filtered.findIndex((item: any) => item.id === selectRoomId) !== -1
    return { rooms: filtered, selectRoomId: isExists ? selectRoomId : filtered[filtered.length - 1]?.id }
}