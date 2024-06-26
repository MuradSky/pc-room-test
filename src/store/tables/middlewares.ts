import { v4 as uuidv4 } from "uuid"
import { RoomId } from "store/rooms/types"
import { TableItemsData, TablesItem } from "./types"

type TReturnTablesType = {
    tables: TablesItem[]
}

type TRoomById= (id: string, { tables }: TReturnTablesType)=> TReturnTablesType

export const addRoomByIdMiddleware = (...[id, { tables }]: Parameters<TRoomById>): TReturnTablesType=> {
    tables.push({
        roomId: id,
        selectTableId: null,
        items: []
    })
    return {
        tables
    }
}

export const removeRoomByIdMiddleware = (...[id, { tables }]: Parameters<TRoomById>): TReturnTablesType=> {
    const filtered = tables.filter((item: TablesItem) => item.roomId !== id)
    return {
        tables: filtered
    }
}



type TAddTable = (roomId: string, data: TableItemsData, { tables }: TReturnTablesType)=> TReturnTablesType

export const addTableMiddleware = (...[roomId, data, { tables }]: Parameters<TAddTable>): TReturnTablesType=> {
    const index = tables.findIndex((item: TablesItem) => item.roomId === roomId)
    const filtered: any = tables.find((item: TablesItem) => item.roomId === roomId)

    filtered.items = [...filtered?.items, {
        ...data,
        id: uuidv4(),
        x: 80,
        y: 80,
        r: 0
    }]

    tables[index] = filtered

    return {
        tables,
    }
}



type TSelectTableId = (roomId: RoomId, id: string, { tables }: TReturnTablesType) => TReturnTablesType

export const addSelectTableIdMiddleware = (...[roomId, id, { tables }]: Parameters<TSelectTableId>): TReturnTablesType=> {
    const [currentRoom, currentRoomIndex]: any = [
        tables.find((item: any) => item.roomId === roomId),
        tables.findIndex((item: any) => item.roomId === roomId)
    ]
    currentRoom.selectTableId = id
    tables[currentRoomIndex] = currentRoom

    return {
        tables
    }
}



type TAddEntity = (data: any, { tables }: TReturnTablesType) => TReturnTablesType

export const addEntityMiddleware = (...[data, { tables }]: Parameters<TAddEntity>): TReturnTablesType=> {
    const { roomId, tableId, entity } = data
    const [currentRoom, currentRoomIndex]: any = [
        tables.find((item: any) => item.roomId === roomId),
        tables.findIndex((item: any) => item.roomId === roomId)
    ]
    const [currentTable, currentTableIndex]: any = [
        currentRoom?.items?.find((item: any) => item.id === tableId),
        currentRoom?.items?.findIndex((item: any) => item.id === tableId)
    ]
    currentTable?.entity.push({...entity})
    currentRoom.items[currentTableIndex] = currentTable
    tables[currentRoomIndex] = currentRoom

    return {
        tables
    }
}

type TRemoveDevice = (id: string, { tables }: TReturnTablesType) => TReturnTablesType

export const removeDeviceMiddleware = (...[id, { tables }]: Parameters<TRemoveDevice>): TReturnTablesType=> {
    const clone = [...tables]
    const data = clone[0]
    data.items = data.items?.filter((item: TableItemsData)=> item.id !== id)

    return {
        tables: [data]
    }
}

type TUpdateDevice = (data: any, { tables }: TReturnTablesType) => TReturnTablesType

export const updateDeviceMiddleware = (...[data, { tables }]: Parameters<TUpdateDevice>): TReturnTablesType=> {
    const clone = [...tables]
    const currentData = clone[0]
    const index = currentData.items?.findIndex((item: TableItemsData) => item.id === data.id)
    let filtered = {...currentData.items?.find((item: TableItemsData) => item.id === data.id)}
    const updateData = {
        ...filtered,
        ...data
    }

    // @ts-ignore
    currentData.items[index] = updateData
    return {
        tables: [currentData]
    }
}
// type TPositionState = (data: any, { tables }: TReturnTablesType)=> TReturnTablesType

// export const savePositionsStateMiddleware = (...[data, { tables }]: Parameters<TPositionState>): TReturnTablesType=> {

//     return {
//         tables
//     }
// }