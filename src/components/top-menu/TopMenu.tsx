import { useState } from 'react'
import { Button, Flex } from 'antd'
import styles from './ToopMenu.module.scss'
import { CreateArea } from 'components/modals/create-area'

export const TopMenu = ()=> {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Flex className={styles.menu} align="center" justify="flex-end" gap={12}>
            <Flex align="center" gap={10}>
                <Button type="primary" onClick={()=> setIsOpen(true)}>
                    Добавить устройство
                </Button>
            </Flex>

            <CreateArea isOpen={isOpen} hideModal={()=> setIsOpen(false)} />
        </Flex>
    )
}