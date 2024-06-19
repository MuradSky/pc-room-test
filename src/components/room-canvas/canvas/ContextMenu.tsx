import { createPortal } from 'react-dom'
import style from './ContextMenu.module.scss'
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface ContextMenuProps {
    data: any
    pos: { x: number, y: number } | null
    removeDevice: ()=> void,
    closeMenu: ()=> void
    openEditModal: ()=> void
}

export const ContextMenu = ({ data, pos, removeDevice, closeMenu, openEditModal }: ContextMenuProps)=> {

    if (!pos) return null

    return createPortal((
        <div className={style.menu} style={{ top: pos.y, left: pos.x }}>
            <Button className={style.close} onClick={closeMenu}>
                <CloseOutlined />
            </Button>
            <div>
                <div className={style.info}>
                    <div className={style.info_row}>
                        <span>Зона:</span>
                        <span>{data.areaName}</span>
                    </div>
                    <div className={style.info_row}>
                        <span>Подзона:</span>
                        <span>{data.subAreaName}</span>
                    </div>
                    <div className={style.info_row}>
                        <span>Устройство:</span>
                        <span>{data.deviceName}</span>
                    </div>
                    <div className={style.info_row}>
                        <span>Позиция:</span>
                        <span>{data.position}</span>
                    </div>
                    <div className={style.info_row}>
                        <span>К.мест:</span>
                        <span>{data.place}</span>
                    </div>
                </div>

                <Button type="text" className={style.btn} onClick={openEditModal}>
                    Редактировать
                    <EditOutlined />
                </Button>
                <Button className={[style.btn, style.del].join(' ')} onClick={removeDevice}  danger type="text">
                    Удалить
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    ), document.body)
}