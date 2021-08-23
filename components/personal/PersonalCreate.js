import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FirebaseContext from "../../firebase/context";

const PersonalCreate = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const [fecha_nacimiento, getFecha_nacimiento] = useState("");
  const [vigencia_contrato, getVigencia_contrato] = useState("");

  const router = useRouter();
  const [form] = Form.useForm();

  const dateFormat = "DD/MM/YYYY";

  async function crearPersonal(values) {
    if (!usuario) {
      return router.push("/login");
    }

    const { nombre, email, password, tipo_personal, dni, celular, direccion } =
      values;

    const empleado = {
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

    console.log(empleado.fecha_nacimiento);

    firebase.db.collection("empleados").add(empleado);

    message.success("¡Creación completada!");

    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const onChangeNac = (date, dateString) => {
    getFecha_nacimiento(dateString);
  };

  const onChangeVig = (date, dateString) => {
    getVigencia_contrato(dateString);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title style={{ textAlign: "center", color: "black" }}>
            Registrar Personal
          </Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={crearPersonal}
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
              Registrar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default PersonalCreate;
