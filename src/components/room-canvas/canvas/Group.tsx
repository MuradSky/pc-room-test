import { useEffect } from "react"
import * as d3 from "d3"
import { ISvgObjectProps } from "./types"

const PCTable = ({ name }: { name: string })=> {
    return (
        <>
            <g>
                <rect width={150} height={100} fill="#a86732" />
                <text x={60} y={80} fontSize={20}>{name}</text>
            </g>
            <g>
                <circle cx={75} cy={0} r={32} fill="#32a852"/>
                <text x={70} y={10} fontSize={24}>1</text>
            </g>
        </>
    )
}

const PSTable = ({ name }: { name: string })=> {
    return (
        <>
            <g>
                <rect width={200} height={100} fill="#a8a432" />
                <text x={80} y={80} fontSize={20}>{name}</text>
            </g>
            <g>
                <circle cx={50} cy={0} r={32} fill="#32a852"/>
                <text x={45} y={10} fontSize={24}>1</text>
            </g>
            <g>
                <circle cx={150} cy={0} r={32} fill="#32a852"/>
                <text x={143} y={10} fontSize={24}>2</text>
            </g>
        </>
    )
}

const VRTable = ({ name }: { name: string })=> {
    return (
        <>
            <g>
                <circle cx={0} cy={80} r={80} fill="#3253a8"/>
                <text x={-20} y={85} fontSize={20}>{name}</text>
            </g>
            <g>
                <circle cx={0} cy={0} r={32} fill="#32a852"/>
                <text x={-5} y={10} fontSize={24}>1</text>
            </g>
            <g>
                <circle cx={0} cy={150} r={32} fill="#32a852"/>
                <text x={-5} y={160} fontSize={24}>2</text>
            </g>
        </>
    )
}

export const Group = ({ data, svg, changePosition }: ISvgObjectProps)=> {
    useEffect(()=> {
        if (svg) {
            const svgRoot = d3.select(svg)
            const box = svgRoot.select(`g[data-group-id="${data.id}"]`)
            let startX = +box.attr("x")
            let startY = +box.attr("y")
            let boxX = startX
            let boxY = startX

            function dragStart(event: any) {
                box.attr('stroke', 'black')
                box.raise()
                startX = event.x
                startY = event.y
                boxX = +box.attr('x')
                boxY = +box.attr('y')
            }

            function dragging(event: any) {
                const dx = startX - event.x
                const dy = startY - event.y
                startX = event.x
                startY = event.y

                box.attr('x', boxX - dx)
                box.attr('y', boxY - dy)
                box.attr('transform', `translate(${(boxX - dx)}, ${(boxY - dy)})`)
                boxX = +box.attr('x')
                boxY = +box.attr('y')
                changePosition()
            }

            function draggend() {
                box.attr('stroke', null)
            }
            // @ts-ignore
            box.call(d3.drag().on('start', dragStart).on('drag', dragging).on('end', draggend))
        }
    }, [svg])

    const children = (
        data.type.toLowerCase() === 'ps' ? <PSTable name={data.name} /> :
        data.type.toLowerCase() === 'vr' ? <VRTable name={data.name} /> :
        <PCTable name={data.name} />
    )

    return (
        <g data-group-id={data.id} x={data.x} y={data.y} transform={`translate(${data.x}, ${data.y})`}>
            {children}
        </g>
    )
}