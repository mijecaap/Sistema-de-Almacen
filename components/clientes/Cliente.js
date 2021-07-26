import { Col, Row } from "antd";
import React from "react";
import ClienteCreate from "./ClienteCreate";
import ClienteDelete from "./ClienteDelete";
import ClienteRead from "./ClienteRead";

const Cliente = ({ menu }) => {
  return (
    <div>
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={4} />
        <Col span={16}>
          {menu === "51" ? <ClienteRead /> : null}
          {menu === "52" ? <ClienteCreate /> : null}
          {/* {menu === "23" ? <ClienteDelete /> : null} */}
          {menu === "54" ? <ClienteDelete /> : null}
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
};

export default Cliente;
