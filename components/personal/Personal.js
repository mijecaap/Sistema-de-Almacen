import { Col, Row } from "antd";
import React from "react";
import PersonalCreate from "./PersonalCreate";
import PersonalDelete from "./PersonalDelete";
import PersonalRead from "./PersonalRead";

const Personal = ({ menu }) => {
  return (
    <div>
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={4} />
        <Col span={16}>
          {menu === "41" ? <PersonalRead /> : null}
          {menu === "42" ? <PersonalCreate /> : null}
          {/* {menu === "43" ? <PersonalDelete /> : null} */}
          {menu === "44" ? <PersonalDelete /> : null}
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
};

export default Personal;
