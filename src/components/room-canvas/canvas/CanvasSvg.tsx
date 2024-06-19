import { useRef, useState } from "react"
import * as d3 from "d3"
import { useRootStore } from "store"
import { DataCollection } from "./types"
import { Button, Flex } from "antd"
import { Group } from "./Group"
import style from "./CanvasSvg.module.scss"
import { ContextMenu } from "./ContextMenu"
import { EditDevice } from "components/modals/edit-device"

export const CanvasSvg = ()=> {
    const svgRef = useRef<any>(null)
    const [currentDevice, setCurrentDevice] = useState<any>(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [menuPos, setMenuPos] = useState<any>(null)
    const [isChangePosition, setIsChangePosition] = useState(false)
    const { areas, subAreas, tables, savePositions, removeDevice } = useRootStore(state => state)

    const changePosition = ()=> setIsChangePosition(true)
    const openEditModal = ()=> {
        setMenuPos(null)
        setOpenEdit(true)
    }
    const closeEditModal = ()=> setOpenEdit(false)

    const handleRemoveDevice = ()=> {
        removeDevice(currentDevice.id)
        setCurrentDevice(null)
        setMenuPos(null)
    }

    const openMenu = (x: number, y:number, deviceId: string | number)=> {
        const data = tables[0].items?.find((item: any)=> item.id === deviceId)
        const areaName = areas.find((item: any) => item.id === data?.areaId)?.name
        const subAreaName = subAreas.find((item: any) => item.id === data?.subAreaId)?.name

        setMenuPos({ x, y })
        setCurrentDevice({
            ...data,
            areaName,
            subAreaName,
        })
    }

    const closeMenu = ()=> {
        setMenuPos(null)
        setCurrentDevice(null)
    }

    const saveState =()=> {
        const svgRoot = d3.select(svgRef.current)
        const children = svgRoot.selectAll('g[data-group-id]').nodes()
        const tData = tables[0].items
        if (tData) {
            const cloned = [...tData]
            const updateData = children.map((el: any)=> {
                const elID = el.getAttribute('data-group-id')
                const element: any = cloned.find((item: DataCollection) => item.id === elID)
                element.x = +el.getAttribute('data-x')
                element.y = +el.getAttribute('data-y')
                element.r = +el.getAttribute('data-r')
                return element
            })
            savePositions([{
                ...tables[0],
                items: updateData
            }])
        }
        setIsChangePosition(false)
    }

    const data = tables[0].items

    return (
        <div className={style.wrapper}>
            <Flex justify="end" style={{ transform: 'translateY(-50px)', marginBottom: '-32px' }}>
                <Button onClick={saveState} type="primary" disabled={!isChangePosition} style={{ marginLeft: 12 }}>Сохранить изменения</Button>
            </Flex>
            <div className={style.block}>
                {/* <AreaSchema className={style.area}/> */}
                <svg width={1440-48} height={900} ref={svgRef} className={style.canvas}>
                    {data?.map((item: DataCollection)=> (
                        <Group
                            key={item.id}
                            data={item}
                            svg={svgRef.current}
                            changePosition={changePosition}
                            openMenu={openMenu}
                        />
                    ))}
                </svg>

                <ContextMenu
                    data={currentDevice}
                    pos={menuPos}
                    removeDevice={handleRemoveDevice}
                    closeMenu={closeMenu}
                    openEditModal={openEditModal}
                />

                <EditDevice isOpen={openEdit} hideModal={closeEditModal} device={currentDevice} />
            </div>
        </div>
    )
}