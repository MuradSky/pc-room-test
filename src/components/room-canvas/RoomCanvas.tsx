import { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { TopMenu } from 'components/top-menu'
import { CreateTable } from 'components/modals/create-table'
import { useRootStore } from 'store'
import { Room } from 'store/rooms/types'
import { TablesItem } from 'store/tables/types'
import styles from './RoomCanvas.module.scss'

export const RoomCanvas = ()=> {
    const { selectRoomId, rooms, tables, addTable, addSelectTableId, addEntity } = useRootStore(store => store)
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
    const [currentTables, setCurrentTables] = useState<TablesItem | null>(null)
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(()=> {
        setCurrentRoom(rooms.find((item: Room) => item.id === selectRoomId) || null)
        setCurrentTables(tables.find((item: TablesItem) => item.roomId === selectRoomId) || null)
    }, [selectRoomId, rooms, tables, setCurrentRoom, setCurrentTables])

    const createEntity = (entity: string)=> {
        addEntity({
            roomId: selectRoomId,
            tableId: currentTables?.selectTableId || null,
            entity: {
                id: uuidv4(),
                name: entity
            }
        })
    }

    const tableCreate = (data: any)=> {
        addTable({
            roomId: selectRoomId,
            data: {
                id: uuidv4(),
                ...data,
            }
        })
    }

    const selectedTable = (id: string)=> ()=> {
        addSelectTableId(
            selectRoomId,
            id
        )
    }

    const onClose = ()=> setIsOpenModal(false)
    const onOpen = ()=> setIsOpenModal(true)

    console.log(currentTables)
    return (
        <div className={styles.block}>
            <div className={styles.menu}>
                <TopMenu
                    openTableModal={onOpen}
                    isTabaleDisabled={!currentTables?.selectTableId}
                    isRoomDisabled={!currentRoom}
                    addEntitiy={createEntity}
                />
            </div>
            <Typography.Title>
                {currentRoom?.title || 'Создай новую комнату'}
            </Typography.Title>
            <div className={styles.wrap}>
                {currentTables?.items?.map((item: any) => (
                    <div
                        key={item.id}
                        className={styles.box}
                        onClick={selectedTable(item.id)}
                        style={{ backgroundColor: currentTables?.selectTableId === item.id ? 'blue' : '#000' }}
                    >
                        <span>{item.name}</span>
                        <span>Entity {item.entity.length}</span>
                    </div>
                ))}
            </div>

            <CreateTable
                isOpen={isOpenModal}
                handleClose={onClose}
                tableCreate={tableCreate}
            />
        </div>
    )
}