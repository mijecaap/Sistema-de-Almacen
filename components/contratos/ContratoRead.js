import { Table, Tag } from "antd";
import React from "react";
import useContratos from "../../hooks/useContratos";
import useServicios from "../../hooks/useServicios";
import useClientes from "../../hooks/useClientes";

const ContratoRead = () => {
  const { contratos } = useContratos("fecha");
  const clientesload = useClientes("nombre");
  const serviciosload = useServicios("nombre");

  const data = [];
  contratos.map((contrato) => {
    data.push({
      key: contrato.id,
      id_cliente: contrato.nombre_cliente,
      id_servicio: contrato.nombre_servicio,
      lugar: contrato.lugar,
      fecha: contrato.fecha,
      cancelado: contrato.cancelado,
      estado: contrato.estado,
    });
  });

  const columns = [
    {
      title: "Cliente",
      dataIndex: "id_cliente",
      key: "id_cliente",
    },
    {
      title: "Servicio",
      dataIndex: "id_servicio",
      key: "id_servicio",
    },
    {
      title: "Lugar",
      dataIndex: "lugar",
      key: "lugar",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Cancelado",
      dataIndex: "cancelado",
      key: "cancelado",
      render: (_, record) => {
        if (record.cancelado === "cancelado") {
          return <Tag color="green">Si</Tag>;
        } else {
          return <Tag color="red">No</Tag>;
        }
      },
    },
    {
      title: "Estado del servicio",
      dataIndex: "estado",
      key: "estado",
      render: (_, record) => {
        if (record.estado === "incompleto") {
          return <Tag color="red">Incompleto</Tag>;
        } else {
          return <Tag color="green">Terminado</Tag>;
        }
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ContratoRead;
