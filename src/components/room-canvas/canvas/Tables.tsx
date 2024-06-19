import PCTableSvg from "assets/svg/pc-table.svg?react"
import PSTable from "assets/svg/ps-table.svg?react"
import VRTable from "assets/svg/vr-table.svg?react"
import style from './CanvasSvg.module.scss'

interface TablesProps {
    position: string | number,
    place: string | number,
    deviceName: string,
    deviceType: string,
    rotate: string | number
}

export const Tables = ({ deviceName, deviceType, place, rotate }: TablesProps)=> {
    const icon =  deviceType.toLowerCase() === 'console' ? <PSTable /> :
        deviceType.toLowerCase() === 'vr' ? <VRTable /> : <PCTableSvg />

    return (
        <g id="g-inner" transform={`rotate(${rotate})`} className={style.inner}>
            <g transform="translate(-75, -59)" >
                <g id="g-rotate" className={style.rotate}>
                    <path d="M78.85 5C78.85 7.67858 76.6786 9.85 74 9.85C71.3214 9.85 69.15 7.67858 69.15 5C69.15 2.32142 71.3214 0.15 74 0.15C76.6786 0.15 78.85 2.32142 78.85 5Z" fill="#EFF6FA" stroke="#009BDC" strokeWidth="0.3"/>
                    <path d="M71.3349 5.33485C71.3349 4.03861 72.2651 2.9557 73.4931 2.71829L73.4931 2L75.4456 3.11958L73.4931 4.23915L73.4931 3.58157C72.7325 3.80184 72.1745 4.50421 72.1745 5.33488C72.1745 6.34143 72.9935 7.16035 74 7.16035C75.0066 7.16035 75.8255 6.34143 75.8255 5.33488C75.8255 5.06377 75.7676 4.80305 75.6534 4.55991L76.4134 4.20293C76.5805 4.55859 76.6652 4.93942 76.6652 5.33485C76.6651 6.80441 75.4695 8 74 8C72.5304 8 71.3349 6.80441 71.3349 5.33485Z" fill="#009BDC"/>
                </g>
                <svg width={150} height={120}>
                    {icon}
                    <text y={42} fontSize={10} x="50%" fill="#009BDC" dominantBaseline="middle" textAnchor="middle">{deviceName}</text>
                    <g>
                        <path d="M95.5 107.5C95.5 110.102 93.3255 112.599 89.4834 114.475C85.6747 116.335 80.3779 117.5 74.5 117.5C68.6221 117.5 63.3253 116.335 59.5166 114.475C55.6745 112.599 53.5 110.102 53.5 107.5C53.5 104.898 55.6745 102.401 59.5166 100.525C63.3253 98.6646 68.6221 97.5 74.5 97.5C80.3779 97.5 85.6747 98.6646 89.4834 100.525C93.3255 102.401 95.5 104.898 95.5 107.5Z" fill="#EFF6FA" stroke="#009BDC"/>
                        <text x={71} y={113} fontSize={14} fill="#009BDC">{place}</text>
                    </g>
                </svg>
                {/* <text x={0} y={12} fontSize={14} fill="#009BDC">{position}</text> */}

                {/* <g transform="translate(120, 110)" id="g-pen" className={style.pen}>
                    <path d="M12.4365 3.37021L16.505 7.43863L6.20659 17.737L2.14045 13.6686L12.4365 3.37021ZM19.5921 2.389L17.7778 0.574631C17.0766 -0.126562 15.938 -0.126562 15.2344 0.574631L13.4964 2.31262L17.5649 6.38107L19.5921 4.3538C20.136 3.80992 20.136 2.93285 19.5921 2.389ZM0.0113444 19.3871C-0.0626962 19.7203 0.238155 20.0189 0.571413 19.9378L5.10502 18.8386L1.03888 14.7702L0.0113444 19.3871Z" fill="#009BDC"/>
                </g> */}
            </g>
        </g>
    )
}

