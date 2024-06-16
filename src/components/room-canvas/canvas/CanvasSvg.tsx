import { useRef, useState } from "react"
import * as d3 from "d3"
import { useRootStore } from "store"
import { DataCollection } from "./types"
import { Button, Flex } from "antd"
import { Group } from "./Group"

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
                element.x = +el.getAttribute('x')
                element.y = +el.getAttribute('y')
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
            <div style={{ borderRadius: 10, overflow: 'hidden', background: '#f1f1f1' }}>
                <svg width={1440-48} height={900} ref={svgRef}>
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