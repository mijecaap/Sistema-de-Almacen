import { Table, Tag, Input, Button, Space } from "antd";
import React, { useState } from "react";
import useMateriales from "../../hooks/useMateriales";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

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

  var searchInput;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
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
      ...getColumnSearchProps("nombre"),
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
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default MaterialRead;
