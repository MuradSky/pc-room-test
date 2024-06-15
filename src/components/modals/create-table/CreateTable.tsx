import { Button, Flex, Form, Input, Modal, Select } from "antd"
import { useState } from "react"

interface CreateTableProps {
    isOpen: boolean
    handleClose: ()=> void
    tableCreate: (data: any) => void
}

const tableForms = [
    { value: 'circle', label: 'Круг' },
    { value: 'square', label: 'Квадрат' },
    { value: 'rectangle', label: 'Прямоугольник' },
]

const seatsObj: any = {
    circle: [
        { value: '1', label: '1'  },
        { value: '2', label: '2'  },
        { value: '3', label: '3'  },
        { value: '4', label: '4'  },
        { value: '5', label: '5'  },
        { value: '6', label: '6'  },
        { value: '7', label: '7'  },
        { value: '8', label: '8'  },
    ],
    square: [
        { value: '1', label: '1'  },
        { value: '2', label: '2'  },
        { value: '3', label: '3'  },
        { value: '4', label: '4'  },
        { value: '5', label: '5'  },
        { value: '6', label: '6'  },
    ],
    rectangle: [
        { value: '1', label: '1'  },
        { value: '2', label: '2'  },
        { value: '3', label: '3'  },
        { value: '4', label: '4'  },
        { value: '5', label: '5'  },
        { value: '6', label: '6'  },
        { value: '7', label: '7'  },
        { value: '8', label: '8'  },
    ],
}

export const CreateTable = ({ isOpen, handleClose, tableCreate }: CreateTableProps)=> {
    const [form] = Form.useForm()
    const [seats, setSeats] = useState<any>(null)

    const onClose = ()=> {
        form.resetFields()
        handleClose()
        setSeats(null)
    }

    const onCreate = (value: any)=> {
        if (!value.name || !value.form || !value.seat) return
        onClose()
        tableCreate(value)
    }

    const handleChange = (value: string) => {
        form.setFieldValue('seat', '')
        setSeats(seatsObj[value])
    }

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <h1>Создать столик</h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={onCreate}
                initialValues={{
                    name: "Столик 1"
                }}
            >
                <Form.Item label="Название" name="name">
                    <Input />
                </Form.Item>
                <Flex justify="space-between">
                    <Form.Item label="Форма стола" name="form" style={{ width: '48%' }}>
                        <Select
                            onChange={handleChange}
                            options={tableForms}
                        />
                    </Form.Item>
                    <Form.Item label="Количество мест" name="seat"  style={{ width: '48%' }}>
                        <Select
                            disabled={!seats}
                            options={seats}
                        />
                    </Form.Item>
                </Flex>

                <Flex justify="flex-end" gap={10}>
                    <Button type="primary" htmlType="submit">Создать</Button>
                    <Button onClick={onClose}>Отмена</Button>
                </Flex>
            </Form>
        </Modal>
    )
}