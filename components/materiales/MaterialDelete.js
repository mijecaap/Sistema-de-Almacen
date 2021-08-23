import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message } from "antd";
import React, { useContext } from "react";
import FirebaseContext from "../../firebase/context";
import useMateriales from "../../hooks/useMateriales";

const MaterialDelete = () => {
  const { materiales } = useMateriales("nombre");

  const { firebase } = useContext(FirebaseContext);

  const handleDelete = async (key) => {
    try {
      await firebase.db.collection("materiales").doc(key).delete();
      message.success("¡Se eliminó correctamente!");
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];
  materiales.map((material) => {
    data.push({
      key: material.id,
      cod_material: material.cod_material,
      nombre: material.nombre,
      descripcion: material.descripcion,
      stock: material.stock,
    });
  });

  const columns = [
    {
      title: "Codigo",
      dataIndex: "cod_material",
      key: "cod_material",
      editable: true,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default MaterialDelete;
