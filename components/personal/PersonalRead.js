import { Table } from "antd";
import React from "react";
import usePersonal from "../../hooks/usePersonal";

const PersonalRead = () => {
  const { empleados } = usePersonal("nombre");
  const data = [];
  empleados.map((empleado) => {
    data.push({
      key: empleado.id,
      nombre: empleado.nombre,
      password: empleado.password,
      tipo_personal: empleado.tipo_personal,
      dni: empleado.dni,
      fecha_nacimiento: empleado.fecha_nacimiento,
      celular: empleado.celular,
      direccion: empleado.direccion,
      vigencia_contrato: empleado.vigencia_contrato,
    });
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Tipo de Personal",
      dataIndex: "tipo_personal",
      key: "tipo_personal",
    },
    {
      title: "Vigencia de Contrato",
      dataIndex: "vigencia_contrato",
      key: "vigencia_contrato",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default PersonalRead;
