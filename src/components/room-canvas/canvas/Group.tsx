import { useEffect } from "react"
import * as d3 from "d3"
import { Tables } from "./Tables"
import { ISvgObjectProps } from "./types"
import style from "./CanvasSvg.module.scss"


export const Group = ({ data, svg, changePosition, openMenu }: ISvgObjectProps)=> {
    useEffect(()=> {
        if (svg) {
            let isRotate = false
            const svgRoot = d3.select(svg)
            const box = svgRoot.select(`g[data-group-id="${data.id}"]`)
            let startX = +box.attr("data-x")
            let startY = +box.attr("data-y")
            let boxX = startX
            let boxY = startX

            function calcDragget(event: any): any {
                const dx = startX - event.x
                const dy = startY - event.y
                startX = event.x
                startY = event.y

                box.attr('data-x', boxX - dx)
                box.attr('data-y', boxY - dy)
                boxX = +box.attr('data-x')
                boxY = +box.attr('data-y')

                return {
                    dx,
                    dy
                }
            }

            function dragStart(event: any) {
                box.attr('stroke', '#009BDC')
                box.attr('stroke-width', '0.3px')
                box.raise()
                startX = event.x
                startY = event.y
                boxX = +box.attr('data-x')
                boxY = +box.attr('data-y')
            }

            function dragging(event: any) {
                if (isRotate) return
                const {dx, dy} = calcDragget(event)
                box.attr('transform', `translate(${(boxX - dx)}, ${(boxY - dy)})`)
                changePosition()
            }

            function draggend() {
                box.attr('stroke', null)
            }

            // @ts-ignore
            box.call(d3.drag().on('start', dragStart).on('drag', dragging).on('end', draggend))
            box.on('contextmenu', function(e) {
                e.preventDefault()
                openMenu(e.clientX, e.clientY, data.id)
            })

             // @ts-ignore
            box.select('#g-rotate').call(d3.drag().on('drag', draggedRotate).on('end', rotateEnd).container(box.node()))

            function rotateEnd() {
                isRotate = false
            }

            function draggedRotate(event: any) {
                isRotate=true
                changePosition()
                const x = event.x;
                const y = event.y;
                let angle;
                if (x < 0) {
                  angle = 270 - (Math.atan(y / -x) * 180 / Math.PI);
                } else {
                  angle = 90 + (Math.atan(y / x) * 180 / Math.PI);
                }
                box.select('#g-inner').attr("transform","rotate("+angle+")");
                box.attr('data-r', angle)
            }
        }
    }, [svg])

    return (
        <g
            data-group-id={data.id}
            data-x={data.x}
            data-y={data.y}
            data-r={data.r}
            transform={`translate(${data.x}, ${data.y})`}
            className={style.group}
        >
            <Tables rotate={data.r} {...data} />
        </g>
    )
}