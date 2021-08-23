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
  Select,
  DatePicker,
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FirebaseContext from "../../firebase/context";
import usePersonal from "../../hooks/usePersonal";

import moment from "moment";

const PersonalUpdate = () => {
  const dateFormat = "DD/MM/YYYY";

  const [current, setCurrent] = useState(0);
  const [id, setId] = useState("");

  const [fecha_nacimiento, getFecha_nacimiento] = useState("");
  const [vigencia_contrato, getVigencia_contrato] = useState("");

  const { empleados } = usePersonal("nombre");

  const { usuario, firebase } = useContext(FirebaseContext);

  const [form] = Form.useForm();
  const router = useRouter();

  const onChangeNac = (date, dateString) => {
    getFecha_nacimiento(dateString);
  };

  const onChangeVig = (date, dateString) => {
    getVigencia_contrato(dateString);
  };

  const handleUpdate = (key) => {
    try {
      setId(key);
      const temp = empleados.filter((personal) => personal.id === key)[0];
      setCurrent(current + 1);
      getFecha_nacimiento(temp.fecha_nacimiento);
      getVigencia_contrato(temp.vigencia_contrato);
      form.setFieldsValue({
        nombre: temp.nombre,
        email: temp.email,
        password: temp.password,
        tipo_personal: temp.tipo_personal,
        dni: temp.dni,
        fecha_nacimiento: temp.fecha_nacimiento
          ? moment(temp.fecha_nacimiento, dateFormat)
          : null,
        celular: temp.celular,
        direccion: temp.direccion,
        vigencia_contrato: temp.vigencia_contrato
          ? moment(temp.vigencia_contrato, dateFormat)
          : null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function actualizarPersonal(values) {
    if (!usuario) {
      return router.push("/login");
    }

    const { nombre, email, password, tipo_personal, dni, celular, direccion } =
      values;

    const personal = {
      nombre,
      email,
      password,
      tipo_personal,
      dni,
      fecha_nacimiento,
      celular,
      direccion,
      vigencia_contrato,
    };

    firebase.db.collection("empleados").doc(id).update(personal);

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
  empleados.map((empleado) => {
    data.push({
      key: empleado.id,
      nombre: empleado.nombre,
      email: empleado.email,
      password: empleado.password,
      tipo_personal: empleado.tipo_personal,
      dni: empleado.dni,
      fecha_nacimiento: empleado.fecha_nacimiento,
      celular: empleado.celular,
      direccion: empleado.direccion,
      vigencia_contrato: empleado.vigencia_contrato,
    });
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Tipo de Personal",
      dataIndex: "tipo_personal",
      key: "tipo_personal",
    },
    {
      title: "Vigencia de Contrato",
      dataIndex: "vigencia_contrato",
      key: "vigencia_contrato",
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

  const tab = (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  );

  const upd = (
    <Form
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={actualizarPersonal}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "Ingrese el nombre",
              },
            ]}
          >
            <Input placeholder="Nombre del empleado" size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "El email no es válido",
              },
              {
                required: true,
                message: "Ingrese el email ",
              },
            ]}
          >
            <Input placeholder="Email del empleado" size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Ingrese la contraseña",
              },
            ]}
          >
            <Input.Password
              placeholder="Contraseña del empleado"
              size="large"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="tipo_personal"
            rules={[
              {
                required: true,
                message: "Ingrese el tipo de personal",
              },
            ]}
          >
            <Select placeholder="Tipo de empleado" size="large">
              <Select.Option value="logistico">Logistico</Select.Option>
              <Select.Option value="administrativo">
                Aministrativo
              </Select.Option>
              <Select.Option value="ventas">Ventas</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="dni"
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
            <Input placeholder="DNI del empleado" size="large" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="fecha_nacimiento"
            rules={[
              {
                required: true,
                message: "Ingrese la fecha de nacimiento",
              },
            ]}
          >
            <DatePicker
              placeholder="Fecha de nacimiento"
              size="large"
              format={dateFormat}
              style={{ width: "100%" }}
              onChange={onChangeNac}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="celular"
            rules={[
              {
                required: true,
                message: "Ingrese un número de celular",
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
            name="direccion"
            rules={[
              {
                required: true,
                message: "Ingrese una dirección de residencia",
              },
            ]}
          >
            <Input placeholder="Dirección del empleado" size="large" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="vigencia_contrato"
            rules={[
              {
                required: true,
                message: "Ingrese una fecha",
              },
            ]}
          >
            <DatePicker
              placeholder="Vigencia del contrato"
              size="large"
              format={dateFormat}
              style={{ width: "100%" }}
              onChange={onChangeVig}
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
      title: "Lista de Servicios",
      description: "Escoja un servicios",
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

export default PersonalUpdate;
