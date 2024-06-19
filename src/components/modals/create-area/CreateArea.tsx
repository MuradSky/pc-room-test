import { Button, Flex, Form, Input, Modal, Select, Typography } from "antd";
import { useState } from "react";
import { useRootStore } from "store";

interface CreateRoomProps {
    isOpen: boolean,
    hideModal: ()=> void
    
}

const { Title } = Typography

const convertData = <T, >(data: T[])=> data.map((item: any)=> ({ value: item.id, label: item.name, type: item.type }))

export const CreateArea = ({ isOpen, hideModal }: CreateRoomProps)=> {
    const { areas, subAreas, devices, addTable, selectRoomId } = useRootStore(state => state)
    const [area, setArea] = useState<string | null>(null)
    const [subArea, setSubArea] = useState<string | null>(null)
    const [form] = Form.useForm()

    const onSelectArea = (id: string)=> setArea(id)
    const onSelectSubArea = (id: string)=> setSubArea(id)

    const onFinish = (values: any) => {
        const selectDevice = devices.find((item: any) => item.id === values.device_id)

        addTable({
            roomId: selectRoomId,
            data: {
                areaId: values.area_id,
                subAreaId: values.sub_area_id,
                deviceId: values.device_id,
                position: values.position,
                place: values.place,
                deviceType: selectDevice?.type,
                deviceName: selectDevice?.name
            }
        })
        form.resetFields()
        hideModal()
    }

    const rules =[
        {
            required: true,
            message: 'Обязательное поле',
        },
    ]

    return (
        <Modal
            open={isOpen}
            onCancel={hideModal}
            footer={null}
        >
            <Title level={3} style={{ textAlign: 'center', marginBottom: 16 }}> Добавить устройство</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Выберите зону" name="area_id" rules={rules}>
                    <Select options={convertData(areas)} onChange={onSelectArea}/>
                </Form.Item>
                <Form.Item label="Выберите под зону" name="sub_area_id" rules={rules}>
                    <Select options={convertData(subAreas)} onChange={onSelectSubArea} />
                </Form.Item>

                {(area && subArea) &&
                    <>
                        <Form.Item label="Выберите устройство" name="device_id" rules={rules}>
                            <Select options={convertData(devices)} />
                        </Form.Item>
                        <Form.Item label="Позиция" name="position" rules={rules}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Количество мест" name="place" rules={rules}>
                            <Input />
                        </Form.Item>
                    </>
                }

                <Flex gap={10} justify="flex-end">
                    <Button type="primary" htmlType="submit">Добавить устройство</Button>
                    <Button onClick={hideModal}>Отмена</Button>
                </Flex>
            </Form>
        </Modal>
    )
}