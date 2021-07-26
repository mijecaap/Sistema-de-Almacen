import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import useClientes from "../../hooks/useClientes";

const ClienteDelete = () => {
  const { clientes } = useClientes("nombre");

  const { firebase } = useContext(FirebaseContext);

  const handleDelete = async (key) => {
    try {
      await firebase.db.collection("clientes").doc(key).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];
  clientes.map((cliente) => {
    data.push({
      key: cliente.id,
      nombre: cliente.nombre,
      doc_identificacion: cliente.doc_identificacion,
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
      width: "10%",
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
    {
      title: "Eliminar",
      dataIndex: "eliminar",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="¿Seguro que desea eliminar?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ClienteDelete;
