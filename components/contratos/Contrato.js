import { Col, Row } from "antd";
import React from "react";
import ContratoCreate from "./ContratoCreate";
import ContratoDelete from "./ContratoDelete";
import ContratoRead from "./ContratoRead";
import ContratoUpdate from "./ContratoUpdate";

const Material = ({ menu }) => {
  return (
    <div>
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={1} />
        <Col span={22}>
          {menu === "61" ? <ContratoRead /> : null}
          {menu === "62" ? <ContratoCreate /> : null}
          {menu === "63" ? <ContratoUpdate /> : null}
          {menu === "64" ? <ContratoDelete /> : null}
        </Col>
        <Col span={1} />
      </Row>
    </div>
  );
};

export default Material;
