import { useRef, useState } from "react"
import * as d3 from "d3"
import { useRootStore } from "store"
import { DataCollection } from "./types"
import { Button, Flex } from "antd"
import { Group } from "./Group"
import AreaSchema from 'assets/svg/area-schema.svg?react'
import style from "./CanvasSvg.module.scss"

export const CanvasSvg = ()=> {
    const [isChangePosition, setIsChangePosition] = useState(false)
    const svgRef = useRef<any>(null)
    const { tables, savePositions } = useRootStore(state => state)
    const changePosition = ()=> setIsChangePosition(true)

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
        <div>
            <Flex justify="end" style={{ transform: 'translateY(-50px)', marginBottom: '-32px' }}>
                <Button onClick={saveState} type="primary" disabled={!isChangePosition}>Сохранить изменения</Button>
            </Flex>
            <div className={style.block}>
                <AreaSchema className={style.area}/>
                <svg width={1440-48} height={900} ref={svgRef} className={style.canvas}>
                    {data?.map((item: DataCollection)=> (
                        <Group
                            key={item.id}
                            data={item}
                            svg={svgRef.current}
                            changePosition={changePosition}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}