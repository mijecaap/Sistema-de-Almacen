import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  Cascader,
  Switch,
  DatePicker,
  Select,
  message,
} from "antd";
import FirebaseContext from "../../firebase/context";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import useServicios from "../../hooks/useServicios";
import useMateriales from "../../hooks/useMateriales";
import useClientes from "../../hooks/useClientes";

const ContratoCreate = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const ctload = useClientes("nombre");
  const svload = useServicios("nombre");
  const mtload = useMateriales("nombre");
  const [clientes, guardarClientes] = useState([]);
  const [servicios, guardarServicios] = useState([]);
  const [fecha, getFecha] = useState("");

  const router = useRouter();
  const [form] = Form.useForm();

  async function crearContrato(values) {
    if (!usuario) {
      return router.push("/login");
    }

    const { id_cliente, id_servicio, lugar, cancelado } = values;
    const estado = "incompleto";

    const nombre_cliente = ctload.clientes.filter(
      (client) => client.id === id_cliente[0]
    )[0].nombre;
    const nombre_servicio = svload.servicios.filter(
      (serv) => serv.id === id_servicio[0]
    )[0].nombre;

    const contrato = {
      id_cliente,
      nombre_cliente,
      id_servicio,
      nombre_servicio,
      lugar,
      fecha,
      cancelado,
      estado,
    };

    var stockvacio = false;
    const sv = svload.servicios.filter((serv) => serv.id === id_servicio[0])[0];

    sv.materiales.map((mat) => {
      const mtfind = mtload.materiales.filter(
        (mate) => mate.id === mat.nombre_material[0]
      )[0];
      if (mtfind.stock - mat.cantidad_material < 0) {
        stockvacio = true;
      }
    });

    if (!stockvacio) {
      sv.materiales.map((mat) => {
        const mtfind = mtload.materiales.filter(
          (mate) => mate.id === mat.nombre_material[0]
        )[0];
        const mtupdate = {
          ...mtfind,
          stock: `${mtfind.stock - mat.cantidad_material}`,
        };
        firebase.db.collection("materiales").doc(mtfind.id).update(mtupdate);
      });

      firebase.db.collection("contratos").add(contrato);

      message.success(
        "¡Contrato creado - Se descontó del stock de materiales!"
      );
    } else {
      message.error("¡No se pudó crear contrato debido a stock agotado!");
    }

    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const obtenerClientes = async () => {
      await firebase.db
        .collection("clientes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const cliente = {
              id: doc.id,
              nombre: doc.data().nombre,
            };
            guardarClientes((clientes) => [...clientes, cliente]);
          });
        });
    };
    const obtenerServicios = async () => {
      await firebase.db
        .collection("servicios")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const servicio = {
              id: doc.id,
              nombre: doc.data().nombre,
            };
            guardarServicios((servicios) => [...servicios, servicio]);
          });
        });
    };

    obtenerClientes();
    obtenerServicios();
  }, []);

  const optionsc = [];
  clientes.map((cliente) => {
    optionsc.push({
      value: cliente.id,
      label: `${cliente.nombre}`,
    });
  });

  const optionss = [];
  servicios.map((servicio) => {
    optionss.push({
      value: servicio.id,
      label: `${servicio.nombre}`,
    });
  });

  const onChange = (date, dateString) => {
    getFecha(dateString);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title style={{ textAlign: "center", color: "black" }}>
            Crear Contrato
          </Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={crearContrato}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={12}>
          <Col span={9}>
            <Form.Item
              name="id_cliente"
              rules={[
                {
                  required: true,
                  message: "Ingrese un cliente",
                },
              ]}
            >
              <Cascader
                size="large"
                options={optionsc}
                placeholder="Escoja un cliente"
              />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="id_servicio"
              rules={[
                {
                  required: true,
                  message: "Ingrese un Servicio",
                },
              ]}
            >
              <Cascader
                size="large"
                options={optionss}
                placeholder="Escoja un servicio"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="cancelado"
              rules={[
                {
                  required: true,
                  message: "Ingrese si fue cancelado",
                },
              ]}
            >
              <Select placeholder="Estado de pago" size="large">
                <Select.Option value="cancelado">Cancelado</Select.Option>
                <Select.Option value="espera">En Espera</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="lugar"
              rules={[
                {
                  required: true,
                  message: "Ingrese el lugar",
                },
              ]}
            >
              <Input placeholder="Lugar" size="large" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="fecha"
              rules={[
                {
                  required: true,
                  message: "Ingrese la fecha",
                },
              ]}
            >
              <DatePicker
                placeholder="Fecha de elaboración"
                size="large"
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default ContratoCreate;
