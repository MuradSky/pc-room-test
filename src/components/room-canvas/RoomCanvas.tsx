import { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { CanvasSvg } from './canvas';
import { TopMenu } from 'components/top-menu'
import { CreateTable } from 'components/modals/create-table'
import { useRootStore } from 'store'
import { Room } from 'store/rooms/types'
import { TablesItem } from 'store/tables/types'
import styles from './RoomCanvas.module.scss'

export const RoomCanvas = ()=> {
    const { selectRoomId, rooms, tables, addTable } = useRootStore(store => store)
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
    const [currentTables, setCurrentTables] = useState<TablesItem | null>(null)
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(()=> {
        setCurrentRoom(rooms.find((item: Room) => item.id === selectRoomId) || null)
        setCurrentTables(tables.find((item: TablesItem) => item.roomId === selectRoomId) || null)
    }, [selectRoomId, rooms, tables, setCurrentRoom, setCurrentTables])

    const tableCreate = (data: any)=> {
        addTable({
            roomId: selectRoomId,
            data,
        })
    }

    const onClose = ()=> setIsOpenModal(false)
    const onOpen = ()=> setIsOpenModal(true)

    return (
        <div className={styles.block}>
            <div className={styles.menu}>
                <TopMenu
                    openTableModal={onOpen}
                    isTabaleDisabled={!currentTables?.selectTableId}
                    isRoomDisabled={!currentRoom}
                    addEntitiy={tableCreate}
                />
            </div>
            <Typography.Title>
                {currentRoom?.title || 'Создай новую комнату'}
            </Typography.Title>

            <CanvasSvg />

            <CreateTable
                isOpen={isOpenModal}
                handleClose={onClose}
                tableCreate={tableCreate}
            />
        </div>
    )
}