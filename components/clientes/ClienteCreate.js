import { Col, Row, Typography, Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import FirebaseContext from "../../firebase/context";

const ClienteCreate = () => {
  const { usuario, firebase } = useContext(FirebaseContext);

  const router = useRouter();
  const [form] = Form.useForm();

  async function crearCliente(values) {
    if (!usuario) {
      return router.push("/login");
    }

    const {
      cod_cliente,
      nombre,
      celular,
      email,
      direccion,
      doc_identificacion,
    } = values;

    const cliente = {
      cod_cliente,
      nombre,
      celular,
      email,
      direccion,
      doc_identificacion,
    };

    firebase.db.collection("clientes").add(cliente);

    message.success("¡Creación completada!");

    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: " + errorInfo);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title style={{ textAlign: "center", color: "black" }}>
            Registrar Cliente
          </Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={crearCliente}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              name="cod_cliente"
              rules={[
                {
                  required: true,
                  message: "Ingrese el codigo del cliente",
                },
              ]}
            >
              <Input placeholder="Codigo del cliente" size="large" />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Ingrese el nombre del cliente",
                },
              ]}
            >
              <Input placeholder="Nombre del cliente" size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="celular"
              rules={[
                {
                  required: true,
                  message: "Ingrese el número de celular",
                },
                {
                  type: "string",
                  len: 9,
                  message: "Ingrese un número válido",
                },
              ]}
            >
              <Input placeholder="Número de celular" size="large" />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "El email no es válido",
                },
                {
                  required: true,
                  message: "Ingrese el email del cliente",
                },
              ]}
            >
              <Input placeholder="Email del cliente" size="large" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="doc_identificacion"
              rules={[
                {
                  required: true,
                  message: "Ingrese el número de dni",
                },
                {
                  type: "string",
                  len: 8,
                  message: "Ingrese un formato válido de dni",
                },
              ]}
            >
              <Input placeholder="DNI del cliente" size="large" />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              name="direccion"
              rules={[
                {
                  required: true,
                  message: "Ingrese una dirección de residencia",
                },
              ]}
            >
              <Input placeholder="Dirección del cliente" size="large" />
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

export default ClienteCreate;
