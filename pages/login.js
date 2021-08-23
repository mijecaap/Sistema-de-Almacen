import { Button, Col, Input, Row, Typography, Form } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import "antd/dist/antd.css";

import FirebaseContext from "../firebase/context";
import firebase from "../firebase/firebase";

// Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";
import usePersonal from "../hooks/usePersonal";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const login = () => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { empleados } = usePersonal("nombre");
  const data = [];
  empleados.map((empleado) => {
    data.push({
      key: empleado.id,
      nombre: empleado.nombre,
      password: empleado.password,
      tipo_personal: empleado.tipo_personal,
      dni: empleado.dni,
      fecha_nacimiento: empleado.fecha_nacimiento,
      celular: empleado.celular,
      direccion: empleado.direccion,
      vigencia_contrato: empleado.vigencia_contrato,
      email: empleado.email,
    });
  });

  const { valores, handleChange } = useValidacion(
    STATE_INICIAL,
    validarIniciarSesion,
    iniciarSesion
  );

  const [usermain, setUserMain] = useState({});

  const { email, password } = valores;
  const { usuario } = useContext(FirebaseContext);

  async function iniciarSesion(values) {
    const user = data.filter((us) => us.email === values.email)[0];
    setUserMain(user);
    try {
      await firebase.login(values.email, values.password);
      Router.push("/");
    } catch (error) {
      //console.log(error.message);

      if (user.email === values.email && user.password === values.password) {
        await firebase.registrar(user.nombre, user.email, user.password);
        await firebase.login(user.email, user.password);
        //Router.push("/");
      }
    }
  }

  useEffect(() => {
    if (usuario !== null) {
      firebase.db.collection("empleados").doc(usermain.key).update({
        uid: usuario.uid,
      });
      Router.push("/");
    }
  }, [usuario]);

  return (
    <>
      <Head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: "url(/img/bglogin.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Row align="middle" style={{ height: "100%" }}>
          <Col span={8} />
          <Col
            span={8}
            style={{
              padding: 20,
              backgroundColor: "rgba(0,0,0,0.75)",
              borderRadius: 5,
            }}
          >
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ textAlign: "center", color: "white" }}
                >
                  Login
                </Typography.Title>
              </Col>
            </Row>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={iniciarSesion}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Porfavor ingrese un correo electrónico válido",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese su contraseña",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Iniciar Sesión
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </div>
    </>
  );
};

export default login;
