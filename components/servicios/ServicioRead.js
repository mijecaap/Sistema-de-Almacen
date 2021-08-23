import { Image, Table, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import useMateriales from "../../hooks/useMateriales";
import useServicios from "../../hooks/useServicios";

const ServicioRead = () => {
  const { servicios } = useServicios("nombre");
  const materialesload = useMateriales("nombre");

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
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen",
      render: (_, record) => {
        return(
          <Avatar shape="square" size={64} src={<Image src={record.imagen}/>} />
        );
      }
    }
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ServicioRead;
