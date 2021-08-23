import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message } from "antd";
import React, { useContext } from "react";
import FirebaseContext from "../../firebase/context";
import usePersonal from "../../hooks/usePersonal";

const PersonalDelete = () => {
  const { empleados } = usePersonal("nombre");

  const { firebase } = useContext(FirebaseContext);

  const handleDelete = async (key) => {
    try {
      await firebase.db.collection("empleados").doc(key).delete();
      message.success("¡Se eliminó correctamente!");
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];
  empleados.map((empleado) => {
    data.push({
      key: empleado.id,
      nombre: empleado.nombre,
      tipo_personal: empleado.tipo_personal,
      dni: empleado.dni,
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
      title: "Tipo de Personal",
      dataIndex: "tipo_personal",
      key: "tipo_personal",
    },
    {
      title: "Vigencia de Contrato",
      dataIndex: "vigencia_contrato",
      key: "vigencia_contrato",
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

export default PersonalDelete;
