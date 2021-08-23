import { Col, Row } from "antd";
import React from "react";
import ClienteCreate from "./ClienteCreate";
import ClienteDelete from "./ClienteDelete";
import ClienteRead from "./ClienteRead";
import ClienteUpdate from "./ClienteUpdate";

const Cliente = ({ menu }) => {
  return (
    <div>
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={1} />
        <Col span={22}>
          {menu === "51" ? <ClienteRead /> : null}
          {menu === "52" ? <ClienteCreate /> : null}
          {menu === "53" ? <ClienteUpdate /> : null}
          {menu === "54" ? <ClienteDelete /> : null}
        </Col>
        <Col span={1} />
      </Row>
    </div>
  );
};

export default Cliente;
