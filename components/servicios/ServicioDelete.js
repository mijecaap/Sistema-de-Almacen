import { Popconfirm, Table, Tag } from "antd";
import React, { useContext } from "react";
import useServicios from "../../hooks/useServicios";
import FirebaseContext from "../../firebase/context";
import { DeleteOutlined } from "@ant-design/icons";
import useMateriales from "../../hooks/useMateriales";

const ServicioDelete = () => {
  const { servicios } = useServicios("nombre");
  const { firebase } = useContext(FirebaseContext);
  const materialesload = useMateriales("nombre");

  const handleDelete = async (key) => {
    try {
      await firebase.db.collection("servicios").doc(key).delete();
      message.success("¡Se eliminó correctamente!");
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];
  servicios.map((servicio) => {
    data.push({
      key: servicio.id,
      nombre: servicio.nombre,
      imagen: servicio.imagen,
      descripcion: servicio.descripcion,
      materiales: servicio.materiales,
    });
  });

  const columns = [
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
      title: "Materiales",
      dataIndex: "materiales",
      key: "materiales",
      render: (_, record) => {
        var idrandom = 0;
        return record.materiales.map((mat) => {
          if (
            materialesload.materiales.filter(
              (load) => load.id === mat.nombre_material[0]
            ).length !== 0
          ) {
            idrandom = idrandom + 1;
            return (
              <Tag color="geekblue" key={idrandom}>
                {
                  materialesload.materiales.filter(
                    (load) => load.id === mat.nombre_material[0]
                  )[0].nombre
                }{" "}
                : {mat.cantidad_material}
              </Tag>
            );
          }
        });
      },
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

export default ServicioDelete;
