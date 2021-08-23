import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Popconfirm,
  Steps,
  Table,
  message,
  Row,
  Col,
  Input,
  Form,
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FirebaseContext from "../../firebase/context";
import useClientes from "../../hooks/useClientes";

const ClienteUpdate = () => {
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState("");

  const { clientes } = useClientes("nombre");

  const { usuario, firebase } = useContext(FirebaseContext);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleUpdate = (key) => {
    try {
      setId(key);
      const temp = clientes.filter((cliente) => cliente.id === key)[0];
      setCurrent(current + 1);
      form.setFieldsValue({
        cod_cliente: temp.cod_cliente,
        nombre: temp.nombre,
        celular: temp.celular,
        email: temp.email,
        direccion: temp.direccion,
        doc_identificacion: temp.doc_identificacion,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function actualizarCliente(values) {
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

    firebase.db.collection("clientes").doc(id).update(cliente);

    message.success("¡Actualización completada!");

    form.resetFields();
    setId("");
    setCurrent(current - 1);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const prev = () => {
    form.resetFields();
    setId("");
    setCurrent(current - 1);
  };

  const data = [];
  clientes.map((cliente) => {
    data.push({
      key: cliente.id,
      nombre: cliente.nombre,
      doc_identificacion: cliente.doc_identificacion,
      celular: cliente.celular,
      email: cliente.email,
      direccion: cliente.direccion,
    });
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Doc. Identificacion",
      dataIndex: "doc_identificacion",
      key: "doc_identificacion",
      width: "10%",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Actualizar",
      dataIndex: "actualizar",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="¿Seguro que desea actualizar?"
            onConfirm={() => handleUpdate(record.key)}
          >
            <a>
              <ReloadOutlined />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];

  const tab = <Table columns={columns} dataSource={data} />;

  const upd = (
    <Form
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={actualizarCliente}
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
            Actualizar
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={() => prev()}>
            Atrás
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );

  const steps = [
    {
      title: "Lista de Clientes",
      description: "Escoja un cliente",
      content: tab,
    },
    {
      title: "Actualizar",
      description: "Seleccione y edite",
      content: upd,
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Steps>
      <div
        style={{
          minHeight: "200px",
          marginTop: "32px",
        }}
      >
        {steps[current].content}
      </div>
    </>
  );
};

export default ClienteUpdate;
