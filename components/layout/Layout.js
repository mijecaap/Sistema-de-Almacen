import React, { useContext, useState } from "react";
import { Button, Col, Layout, Menu, Row, Typography } from "antd";
import {
  FormatPainterOutlined,
  IdcardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import "antd/dist/antd.css";

import { FirebaseContext } from "../../firebase";
import Servicio from "../servicios/Servicio";
import Material from "../materiales/Material";
import Inicio from "../inicio/Inicio";
import Personal from "../personal/Personal";
import Cliente from "../clientes/Cliente";

const { Header, Sider, Content } = Layout;

const LayoutMain = (props) => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const [menu, setMenu] = useState("");
  const [submenu, setSubmenu] = useState("");

  const handleClick = (e) => {
    if (e.keyPath.length === 1) {
      setSubmenu(e.key);
      return;
    }
    setSubmenu(e.keyPath[1]);
    setMenu(e.keyPath[0]);
  };

  return (
    <>
      <Head>
        <title>Taller Sistema</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["sub1"]}
            onClick={handleClick}
          >
            <Menu.Item key="sub1">Inicio</Menu.Item>

            <Menu.SubMenu
              key="sub2"
              icon={<FormatPainterOutlined />}
              title="Materiales"
            >
              <Menu.Item key="21">Leer</Menu.Item>
              <Menu.Item key="22">Crear</Menu.Item>
              <Menu.Item key="23">Actualizar</Menu.Item>
              <Menu.Item key="24">Eliminar</Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="sub3"
              icon={<ShoppingCartOutlined />}
              title="Servicios"
            >
              <Menu.Item key="31">Leer</Menu.Item>
              <Menu.Item key="32">Crear</Menu.Item>
              <Menu.Item key="33">Actualizar</Menu.Item>
              <Menu.Item key="34">Eliminar</Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="sub4" icon={<IdcardOutlined />} title="Personal">
              <Menu.Item key="41">Leer</Menu.Item>
              <Menu.Item key="42">Crear</Menu.Item>
              <Menu.Item key="43">Actualizar</Menu.Item>
              <Menu.Item key="44">Eliminar</Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="sub5" icon={<UserOutlined />} title="Clientes">
              <Menu.Item key="51">Leer</Menu.Item>
              <Menu.Item key="52">Crear</Menu.Item>
              <Menu.Item key="53">Actualizar</Menu.Item>
              <Menu.Item key="54">Eliminar</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row justify="space-between" align="middle">
              <Col span={18}>
                <Typography.Title
                  style={{ color: "white", lineHeight: 0, marginTop: "15px", marginLeft: "15px" }}
                >
                  Bienvenido {usuario.displayName}
                </Typography.Title>
              </Col>
              <Col span={4}>
                <Row justify="center">
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => firebase.cerrarSesion()}
                    >
                      Cerrar Sesión
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
            }}
          >
            {submenu === "sub1" ? <Inicio /> : null}
            {submenu === "sub2" ? <Material menu={menu} /> : null}
            {submenu === "sub3" ? <Servicio menu={menu} /> : null}
            {submenu === "sub4" ? <Personal menu={menu} /> : null}
            {submenu === "sub5" ? <Cliente menu={menu} /> : null}
          </Content>
        </Layout>
      </Layout>
      <main>{props.children}</main>
    </>
  );
};

export default LayoutMain;
