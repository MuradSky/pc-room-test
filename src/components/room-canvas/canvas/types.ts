import { TableItemsData } from "store/tables/types"

export interface ISvgObjectProps {
    data: TableItemsData,
    svg?: any,
    changePosition: ()=> void
    openMenu: (x: number, y: number, deviceId: string | number) => void
}

export type DataCollection = TableItemsData