import { useState } from "react";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { v4 as uuidv4 } from 'uuid';
import { CreateRoom } from "components/modals/createRoom";
import { useRootStore } from "store";
import style from "./SideMenu.module.scss";
const { Title } = Typography

export const SideMenu = ()=> {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { rooms, addRoom, selectRoomId, addSelectRoomID, removeRoom, addRoomById, removeRoomById } = useRootStore(state => state)

    const toggleModal = ()=> setIsOpenModal(!isOpenModal)
    const createRoom = (title: string)=> {
        const itemId = uuidv4()
        addRoom({
            id: itemId,
            title: title,
        })
        addRoomById(itemId)
    }

    const remove = (id: string)=> ()=> {
        removeRoom(id)
        removeRoomById(id)
    }

    const changeRoom = (id: string)=> ()=> {
        addSelectRoomID(id)
    }

    return (
        <div className={style.menu}>
            <Title level={3}>Комнаты</Title>
            <div className={style.list}>
                {rooms.map((item: any) => (
                    <div className={style.list_item} key={item.id}>
                        <Button
                            type={item.id === selectRoomId ? 'primary' : 'default'}
                            onClick={changeRoom(item.id)}
                        >
                            {item.title}
                        </Button>
                        <span className={style.clear} onClick={remove(item.id)}>
                            <CloseCircleOutlined />
                        </span>
                    </div>
                ))}
            </div>
            <Button style={{ marginTop: 32 }} onClick={toggleModal}>
                <PlusOutlined />
                Создать комнату
            </Button>

            <CreateRoom
                isOpen={isOpenModal}
                hideModal={toggleModal}
                createRoom={createRoom}
            />
        </div>
    )
}