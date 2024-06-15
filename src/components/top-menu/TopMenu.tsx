import { Button, Flex } from 'antd'
import { AimOutlined, DeploymentUnitOutlined, DesktopOutlined, OneToOneOutlined } from '@ant-design/icons'
import styles from './ToopMenu.module.scss'

interface TopMenuProps {
    isRoomDisabled: boolean,
    openTableModal: ()=> void,
    isTabaleDisabled: boolean,
    addEntitiy: (v: string)=> void
}

export const TopMenu = ({ openTableModal, isRoomDisabled, isTabaleDisabled, addEntitiy }: TopMenuProps)=> {
    const onAdd = (entity: string)=> ()=> {
        addEntitiy(entity)
    }
    return (
        <Flex className={styles.menu} align="center" gap={12}>
            <Button onClick={openTableModal} disabled={isRoomDisabled}>
                <OneToOneOutlined />
                Добавить Столик
            </Button>
            <Flex className={styles.btns} align="center" gap={10}>
                <Button disabled={isTabaleDisabled || isRoomDisabled} onClick={onAdd('PC')}>
                    <DesktopOutlined />
                    Добавить ПК
                </Button>
                <Button disabled={isTabaleDisabled || isRoomDisabled} onClick={onAdd('PS')}>
                    <DeploymentUnitOutlined />
                    Добавить PS
                </Button>
                <Button disabled={isTabaleDisabled || isRoomDisabled} onClick={onAdd('VR')}>
                    <AimOutlined />
                    Добавить VR
                </Button>
            </Flex>
        </Flex>
    )
}