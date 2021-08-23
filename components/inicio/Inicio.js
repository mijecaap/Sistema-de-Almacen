import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Typography, Avatar } from "antd";
import FirebaseContext from "../../firebase/context";
import usePersonal from "../../hooks/usePersonal";
import { UserOutlined } from "@ant-design/icons";

const Inicio = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const { empleados } = usePersonal("nombre");

  const [usermain, setUsermain] = useState({});

  //console.log(empleados)

  useEffect(() => {
    if (usuario !== null && empleados.length !== 0) {
      const user = empleados.filter((us) => us.uid === usuario.uid)[0];
      setUsermain(user);
    }
  }, [usuario, empleados]);

  return (
    <div>
      <Row style={{ marginTop: "16px" }}> 
        <Col span={4} />
        <Col span={16}>
          <Row align="middle" style={{ marginBottom: "16px" }}>
            <Col span={16}>
              <Row>
                <Typography.Text>Nombre Completo</Typography.Text>
              </Row>
              <Row>
                <Typography.Title level={4}>{usermain.nombre}</Typography.Title>
              </Row>
              <Row>
                <Typography.Text>Dirección</Typography.Text>
              </Row>
              <Row>
                <Typography.Title level={4}>
                  {usermain.direccion}
                </Typography.Title>
              </Row>
            </Col>
            <Col span={8}>
              <Row justify="end">
                <Col>
                  <Avatar size={128} icon={<UserOutlined />} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align="middle" justify="space-between">
            <Col>
              <Row>
                <Typography.Text>Puesto</Typography.Text>
              </Row>
              <Row>
                <Typography.Title level={4}>
                  {usermain.tipo_personal}
                </Typography.Title>
              </Row>
            </Col>
            <Col>
              <Row>
                <Typography.Text>DNI</Typography.Text>
              </Row>
              <Row>
                <Typography.Title level={4}>{usermain.dni}</Typography.Title>
              </Row>
            </Col>
            <Col>
              <Row>
                <Typography.Text>Celular</Typography.Text>
              </Row>
              <Row>
                <Typography.Title level={4}>
                  {usermain.celular}
                </Typography.Title>
              </Row>
            </Col>
          </Row>
        
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
};

export default Inicio;
