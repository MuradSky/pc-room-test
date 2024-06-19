import { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { CanvasSvg } from './canvas';
import { TopMenu } from 'components/top-menu'
import { useRootStore } from 'store'
import { Room } from 'store/rooms/types'
import { TablesItem } from 'store/tables/types'
import styles from './RoomCanvas.module.scss'

export const RoomCanvas = ()=> {
    const { selectRoomId, rooms, tables } = useRootStore(store => store)
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
    const [, setCurrentTables] = useState<TablesItem | null>(null)

    useEffect(()=> {
        setCurrentRoom(rooms.find((item: Room) => item.id === selectRoomId) || null)
        setCurrentTables(tables.find((item: TablesItem) => item.roomId === selectRoomId) || null)
    }, [selectRoomId, rooms, tables, setCurrentRoom, setCurrentTables])

    return (
        <div className={styles.block}>
            <div className={styles.menu}>
                <TopMenu />
            </div>
            <Typography.Title>
                {currentRoom?.title || 'Создай новую комнату'}
            </Typography.Title>

            {tables && <CanvasSvg />}
        </div>
    )
}