import { Button, Flex, Form, Input, Modal, Select, Typography } from "antd";
import { useRootStore } from "store";

interface CreateRoomProps {
    isOpen: boolean,
    hideModal: ()=> void
    device: any
}

const { Title } = Typography

const convertData = <T, >(data: T[])=> data.map((item: any)=> ({ value: item.id, label: item.name, type: item.type }))

export const EditDevice = ({ isOpen, hideModal, device }: CreateRoomProps)=> {
    const { areas, subAreas, devices, updateData } = useRootStore(state => state)
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        const selectDevice = devices.find((item: any) => item.id === values.device_id)

        updateData({
            id: device.id,
            areaId: values.area_id,
            subAreaId: values.sub_area_id,
            deviceId: values.device_id,
            position: values.position,
            place: values.place,
            deviceType: selectDevice?.type,
            deviceName: selectDevice?.name
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

    if (!device) return null

    const initialValues = {
        area_id: device.areaId,
        sub_area_id: device.subAreaId,
        device_id: device.deviceId,
        position: device.position,
        place: device.place,
    }

    return (
        <Modal
            open={isOpen}
            onCancel={hideModal}
            footer={null}
        >
            <Title level={3} style={{ textAlign: 'center', marginBottom: 16 }}>Устройство: {device.deviceName}</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item label="Выберите зону" name="area_id" rules={rules}>
                    <Select options={convertData(areas)} />
                </Form.Item>
                <Form.Item label="Выберите под зону" name="sub_area_id" rules={rules}>
                    <Select options={convertData(subAreas)} />
                </Form.Item>

                <Form.Item label="Выберите устройство" name="device_id" rules={rules}>
                    <Select options={convertData(devices)} />
                </Form.Item>
                <Form.Item label="Позиция" name="position" rules={rules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Количество мест" name="place" rules={rules}>
                    <Input />
                </Form.Item>

                <Flex gap={10} justify="flex-end">
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                    <Button onClick={hideModal}>Отмена</Button>
                </Flex>
            </Form>
        </Modal>
    )
}