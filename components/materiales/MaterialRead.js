import {Table, Tag } from "antd";
import React from "react";
import useMateriales from "../../hooks/useMateriales";

const MaterialRead = () => {
  const { materiales } = useMateriales("nombre");
  const data = [];
  materiales.map((material) => {
    data.push({
      key: material.id,
      cod_material: material.cod_material,
      nombre: material.nombre,
      precio: material.precio,
      descripcion: material.descripcion,
      stock: material.stock,
      capacidad_max: material.capacidad_max,
    });
  });

  const columns = [
    {
      title: "Codigo",
      dataIndex: "cod_material",
      key: "cod_material",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.precio - b.precio,
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
      title: "Estado",
      dataIndex: "estado",
      render: (_, record) => {
        const porcentaje = (100 * record.stock) / record.capacidad_max;
        if (porcentaje <= 15) {
          return (
            <Tag color="red" key={record.id}>
              STOCK BAJO
            </Tag>
          );
        } else if (porcentaje <= 50) {
          return (
            <Tag color="yellow" key={record.id}>
              STOCK MEDIO
            </Tag>
          );
        } else if (porcentaje <= 100) {
          return (
            <Tag color="green" key={record.id}>
              STOCK LLENO
            </Tag>
          );
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

export default MaterialRead;
