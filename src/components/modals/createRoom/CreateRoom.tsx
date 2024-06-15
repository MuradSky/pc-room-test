import { Button, Flex, Form, Input, Modal, Typography } from "antd";

interface CreateRoomProps {
    isOpen: boolean,
    hideModal: ()=> void
    createRoom: (d: string) => void
}

const { Title } = Typography

export const CreateRoom = ({ isOpen, hideModal, createRoom }: CreateRoomProps)=> {
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        if (values.title) {
            form.resetFields()
            createRoom(values.title)
            hideModal()
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={hideModal}
            footer={null}
        >
            <Title level={3} style={{ textAlign: 'center', marginBottom: 16 }}>Новая комната</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Название"
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Flex gap={10} justify="flex-end">
                    <Button type="primary" htmlType="submit">Создать</Button>
                    <Button onClick={hideModal}>Отмена</Button>
                </Flex>
            </Form>
        </Modal>
    )
}