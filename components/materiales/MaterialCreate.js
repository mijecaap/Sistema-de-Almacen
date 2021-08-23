import { Col, Row, Typography, Form, Input, Button, message } from "antd";
import FirebaseContext from "../../firebase/context";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const MaterialCreate = () => {
  const { usuario, firebase } = useContext(FirebaseContext);

  const router = useRouter();
  const [form] = Form.useForm();

  async function crearMaterial(values) {
    if (!usuario) {
      return router.push("/login");
    }

    const { cod_material, nombre, precio, descripcion, stock, capacidad_max } =
      values;

    const material = {
      cod_material,
      nombre,
      precio,
      descripcion,
      stock,
      capacidad_max,
    };

    firebase.db.collection("materiales").add(material);

    message.success("¡Creación completada!");

    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title style={{ textAlign: "center", color: "black" }}>
            Create Materials
          </Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={crearMaterial}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="cod_material"
              rules={[
                {
                  required: true,
                  message: "Ingrese el codigo del material",
                },
              ]}
            >
              <Input placeholder="Codigo del material" size="large" />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Ingrese el nombre del material",
                },
              ]}
            >
              <Input placeholder="Nombre del material" size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="precio"
              rules={[
                {
                  required: true,
                  message: "Ingrese el precio del material",
                },
              ]}
            >
              <Input
                placeholder="Precio del material"
                type="number"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Ingrese el stock del material",
                },
              ]}
            >
              <Input
                placeholder="Stock del material"
                type="number"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="capacidad_max"
              rules={[
                {
                  required: true,
                  message: "Ingrese la capacidad máxima del material",
                },
              ]}
            >
              <Input
                placeholder="Capacidad máxima del material"
                type="number"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="descripcion"
              rules={[
                {
                  required: true,
                  message: "Ingrese la descripcion del material",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Descripcion del material"
                size="large"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>
          </Col>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default MaterialCreate;
