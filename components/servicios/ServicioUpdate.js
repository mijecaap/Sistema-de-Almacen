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
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import useServicios from "../../hooks/useServicios";

const ServicioUpdate = () => {
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState("");

  const { servicios } = useServicios("nombre");

  const { usuario, firebase } = useContext(FirebaseContext);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleUpdate = (key) => {
      try {
          setId(key);
          const temp = servicios.filter((servicio) => servicio.id === key)[0];
          setCurrent(current +1);
          form.setFieldsValue({
              nombre: temp.nombre,
              descripcion: temp.descripcion,
          })
      }
  }
};

export default ServicioUpdate;
