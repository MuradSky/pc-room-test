import { RoomId } from "store/rooms/types"

export interface TableItemsData {
    id: string,
    areaId: string | number,
    subAreaId: string | number,
    deviceId: string | number,
    position: string | number,
    place: string | number,
    deviceName: string,
    deviceType: string,
    x: number,
    y: number,
    r: number,
}

export interface AddEntityType {
    roomId: RoomId,
    tableId: RoomId,
    entity: {
        id: RoomId,
        name: string
    }
}

export interface TablesItem {
    roomId: string,
    selectTableId: string | null,
    items?: TableItemsData[]
}

export interface TablesState {
    tables: TablesItem[],
    updateData: (data: any) => void
    removeDevice: (id: string) => void
    addRoomById: (roomId: string) => void
    removeRoomById: (roomId: string) => void,
    addTable: (data: any) => void,
    addSelectTableId: (roomId: RoomId, id: string)=> void
    addEntity: (data: AddEntityType) => void
    savePositions: (data: TablesItem[])=> void
}
