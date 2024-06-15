import { ReactElement } from 'react'
import { Button, Flex } from 'antd'
import { AimOutlined, DeploymentUnitOutlined, DesktopOutlined } from '@ant-design/icons'
import styles from './ToopMenu.module.scss'


interface BtnParams {
    id: number,
    type: string,
    name: string,
    place: number,
    text: string,
    icon: ReactElement
}

interface TopMenuProps {
    isRoomDisabled: boolean,
    openTableModal: ()=> void,
    isTabaleDisabled: boolean,
    addEntitiy: (data: Pick<BtnParams, 'type' | 'name' | 'place'>)=> void
}

const types: BtnParams[] = [
    {
        id: 1,
        type: 'PC',
        name: 'PC',
        place: 1,
        text: 'Добавить ПК',
        icon: <DesktopOutlined />
    },
    {
        id: 2,
        type: 'PS',
        name: 'PS',
        place: 2,
        text: 'Добавить PS',
        icon: <DeploymentUnitOutlined />
    },
    {
        id: 3,
        type: 'VR',
        name: 'VR',
        place: 2,
        text: 'Добавить VR',
        icon: <AimOutlined />
    }
]

export const TopMenu = ({ addEntitiy }: TopMenuProps)=> {
    const onAdd = (entity: BtnParams)=> ()=> {
        addEntitiy({
            type: entity.type,
            name: entity.name,
            place: entity.place,
        })
    }

    return (
        <Flex className={styles.menu} align="center" justify="flex-end" gap={12}>
            {/* <Button onClick={openTableModal} disabled={isRoomDisabled}>
                <OneToOneOutlined />
                Добавить Столик
            </Button> */}
            <Flex className={styles.btns} align="center" gap={10}>
                {types.map((item: BtnParams)=> (
                    <Button onClick={onAdd(item)} key={item.id}>
                        {item.icon}
                        {item.text}
                    </Button>
                ))}
            </Flex>
        </Flex>
    )
}