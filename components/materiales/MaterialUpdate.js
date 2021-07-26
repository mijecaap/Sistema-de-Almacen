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
import { FirebaseContext } from "../../firebase";
import useMateriales from "../../hooks/useMateriales";

const MaterialUpdate = () => {
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState("");

  const { materiales } = useMateriales("nombre");

  const { usuario, firebase } = useContext(FirebaseContext);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleUpdate = (key) => {
    try {
      setId(key);
      const temp = materiales.filter((material) => material.id === key)[0];
      setCurrent(current + 1);
      form.setFieldsValue({
        cod_material: temp.cod_material,
        nombre: temp.nombre,
        precio: temp.precio,
        stock: temp.stock,
        capacidad_max: temp.capacidad_max,
        descripcion: temp.descripcion,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function actualizarMaterial(values) {
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

    firebase.db.collection("materiales").doc(id).update(material);

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
  materiales.map((material) => {
    data.push({
      key: material.id,
      cod_material: material.cod_material,
      nombre: material.nombre,
      descripcion: material.descripcion,
      stock: material.stock,
    });
  });

  const columns = [
    {
      title: "Codigo",
      dataIndex: "cod_material",
      key: "cod_material",
      editable: true,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
      onFinish={actualizarMaterial}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={12}>
        <Col span={6}>
          <Form.Item
            label="Código"
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
            label="Nombre"
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
            label="Precio"
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
            label="Stock"
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
            label="Capacidad máxima"
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
            label="Descripcion"
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
      title: "Lista de Materiales",
      description: "Escoja un material",
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

export default MaterialUpdate;
