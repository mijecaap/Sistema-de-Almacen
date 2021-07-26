import { Table } from "antd";
import React from "react";
import useClientes from "../../hooks/useClientes";

const ClienteRead = () => {
  const { clientes } = useClientes("nombre");

  const data = [];
  clientes.map((cliente) => {
    data.push({
      key: cliente.id,
      nombre: cliente.nombre,
      doc_identificacion: cliente.doc_identificacion,
      celular: cliente.celular,
      email: cliente.email,
      direccion: cliente.direccion,
    });
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Doc. Identificacion",
      dataIndex: "doc_identificacion",
      key: "doc_identificacion",
      width: "10%"
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ClienteRead;
