import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  Space,
  Cascader,
  InputNumber,
  message,
} from "antd";
import FirebaseContext from "../../firebase/context";
import { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import React, { useContext, useState, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ServicioCreate = () => {
  const [nombreimagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [imagen, guardarUrlImagen] = useState("");
  const [materiales, guardarMateriales] = useState([]);

  const { usuario, firebase } = useContext(FirebaseContext);

  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
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

  async function crearServicio(values) {
    if (!usuario) {
      return router.push("/login");
    }

    console.log(values);

    const { nombre, descripcion, materiales } = values;

    const servicio = {
      nombre,
      imagen,
      descripcion,
      materiales,
    };

    firebase.db.collection("servicios").add(servicio);

    message.success("¡Creación completada!");

    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title style={{ textAlign: "center", color: "black" }}>
            Crear Servicio
          </Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={crearServicio}
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
              Crear
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default ServicioCreate;
