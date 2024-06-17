import PCTableSvg from "assets/svg/pc-table.svg?react"
import PSTable from "assets/svg/ps-table.svg?react"
import VRTable from "assets/svg/vr-table.svg?react"

export const Tables = ({ type, rotate }: { name: string, type: string, rotate: number })=> {
    const icon =  type.toLowerCase() === 'ps' ? <PSTable /> :
        type.toLowerCase() === 'vr' ? <VRTable /> : <PCTableSvg />
    return (
        <g id="g-inner" transform={`rotate(${rotate})`}>
            <g transform="translate(-75, -59)" >
                <g id="g-rotate">
                    <path d="M78.85 5C78.85 7.67858 76.6786 9.85 74 9.85C71.3214 9.85 69.15 7.67858 69.15 5C69.15 2.32142 71.3214 0.15 74 0.15C76.6786 0.15 78.85 2.32142 78.85 5Z" fill="#EFF6FA" stroke="#009BDC" strokeWidth="0.3"/>
                    <path d="M71.3349 5.33485C71.3349 4.03861 72.2651 2.9557 73.4931 2.71829L73.4931 2L75.4456 3.11958L73.4931 4.23915L73.4931 3.58157C72.7325 3.80184 72.1745 4.50421 72.1745 5.33488C72.1745 6.34143 72.9935 7.16035 74 7.16035C75.0066 7.16035 75.8255 6.34143 75.8255 5.33488C75.8255 5.06377 75.7676 4.80305 75.6534 4.55991L76.4134 4.20293C76.5805 4.55859 76.6652 4.93942 76.6652 5.33485C76.6651 6.80441 75.4695 8 74 8C72.5304 8 71.3349 6.80441 71.3349 5.33485Z" fill="#009BDC"/>
                </g>
                {/* <circle r={10} cx={0}  cy={0} id="g-rotate"/> */}
                {icon}
            </g>
            {/* <text x="40%" y="38%" fontSize={12} fill="#009BDC">{name}</text> */}
        </g>
    )
}

