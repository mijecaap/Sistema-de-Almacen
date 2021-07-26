import { Button, Col, Input, Row, Typography, Form } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import "antd/dist/antd.css";

import firebase from "../firebase";

// Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const login = () => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { valores, handleChange } = useValidacion(
    STATE_INICIAL,
    validarIniciarSesion,
    iniciarSesion
  );

  const { email, password } = valores;

  async function iniciarSesion(values) {
    try {
      await firebase.login(values.email, values.password);
      Router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  }

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
            style={{ padding: 20, backgroundColor: "rgba(0,0,0,0.75)", borderRadius: 5 }}
          >
            <Row>
              <Col span={24}>
                <Typography.Title style={{ textAlign: "center", color: "white" }}>
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
