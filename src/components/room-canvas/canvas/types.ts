import { TableItemsData } from "store/tables/types"

export interface ISvgObjectProps {
    data: TableItemsData,
    svg: any,
    changePosition: ()=> void
}

export type DataCollection = TableItemsData