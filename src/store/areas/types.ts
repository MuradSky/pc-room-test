export interface IAreaItem {
    id: string | number,
    name: string,
    type: string,
}

export interface AreaState {
    areas: IAreaItem[],
    subAreas: IAreaItem[],
    devices: IAreaItem[]
}