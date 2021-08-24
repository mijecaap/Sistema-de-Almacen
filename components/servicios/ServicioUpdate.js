import {
  MinusCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Popconfirm,
  Steps,
  Table,
  message,
  Row,
  Col,
  Input,
  Form,
  Tag,
  Space,
  Cascader,
  InputNumber,
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FirebaseContext from "../../firebase/context";
import useServicios from "../../hooks/useServicios";
import FileUploader from "react-firebase-file-uploader";
import useMateriales from "../../hooks/useMateriales";

const ServicioUpdate = () => {
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState("");

  const [nombreimagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [imagen, guardarUrlImagen] = useState("");

  const { servicios } = useServicios("nombre");
  const materialesload = useMateriales("nombre");

  const { usuario, firebase } = useContext(FirebaseContext);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => {
    guardarProgreso({ progreso });
  };

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.log("Error: ", error);
  };

  const handleUploadSuccess = (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase.storage
      .ref("servicios")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };

  const [materiales, guardarMateriales] = useState([]);

  React.useEffect(() => {
    const obtenerMateriales = async () => {
      await firebase.db
        .collection("materiales")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const material = {
              id: doc.id,
              nombre: doc.data().nombre,
              stock: doc.data().stock,
            };
            guardarMateriales((materiales) => [...materiales, material]);
          });
        });
    };
    obtenerMateriales();
  }, []);

  const options = [];
  materiales.map((material) => {
    options.push({
      value: material.id,
      label: `${material.nombre}`,
    });
  });

  const handleUpdate = (key) => {
    try {
      setId(key);
      const temp = servicios.filter((servicio) => servicio.id === key)[0];
      setCurrent(current + 1);
      form.setFieldsValue({
        nombre: temp.nombre,
        descripcion: temp.descripcion,
        materiales: temp.materiales,
        //imagen: temp.imagen,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function actualizarServicio(values) {
    if (!usuario) {
      return router.push("/login");
    }

    const { nombre, descripcion, materiales } = values;

    const servicio = {
      nombre,
      descripcion,
      materiales,
      imagen,
    };

    console.log(servicio);

    firebase.db.collection("servicios").doc(id).update(servicio);

    message.success("¡Actualización completada!");

    form.resetFields();
    setId("");
    setCurrent(current - 1);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const prev = () => {
    form.resetFields();
    setId("");
    setCurrent(current - 1);
  };

  const data = [];
  servicios.map((servicio) => {
    data.push({
      key: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      materiales: servicio.materiales,
      //imagen: servicio.imagen,
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
      title: "Actualizar",
      dataIndex: "actualizar",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="¿Seguro que desea actualizar?"
            onConfirm={() => handleUpdate(record.key)}
          >
            <a>
              <ReloadOutlined />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];

  const tab = <Table columns={columns} dataSource={data} />;

  const upd = (
    <Form
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={actualizarServicio}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "Ingrese el nombre del servicio",
              },
            ]}
          >
            <Input placeholder="Nombre del servicio" size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <FileUploader
            accept="image/*"
            name="imagen"
            randomizeFilename
            storageRef={firebase.storage.ref("servicios")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </Col>

        <Col span={24}>
          <Form.Item
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Ingrese la descripcion del servicio",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Descripcion del servicio"
              size="large"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.List name="materiales">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "nombre_material"]}
                      fieldkey={[name, "nombre_material"]}
                      rules={[
                        {
                          required: true,
                          message: "Ingrese el nombre del material",
                        },
                      ]}
                    >
                      <Cascader
                        options={options}
                        placeholder="Escoja un material"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "cantidad_material"]}
                      fieldKey={[fieldKey, "cantidad_material"]}
                      rules={[
                        {
                          required: true,
                          message: "Ingrese la cantidad del material",
                        },
                      ]}
                    >
                      <InputNumber min={1} placeholder="Cantidad" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Agregar Material
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={() => prev()}>
            Atrás
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );

  const steps = [
    {
      title: "Lista de Servicios",
      description: "Escoja un servicios",
      content: tab,
    },
    {
      title: "Actualizar",
      description: "Seleccione y edite",
      content: upd,
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Steps>
      <div
        style={{
          minHeight: "200px",
          marginTop: "32px",
        }}
      >
        {steps[current].content}
      </div>
    </>
  );
};

export default ServicioUpdate;
