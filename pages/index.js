import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import { useRouter } from "next/router";
import { Button, Result } from "antd";

var user;

const Home = () => {
  const { usuario, firebase } = useContext(FirebaseContext);

  const router = useRouter();

  const onClick = () => {
    router.push("/login");
  };

  return (
    <div>
      {usuario ? (
        <Layout></Layout>
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Lo sentimos, no está autorizado para acceder a esta página."
          extra={
            <Button type="primary" onClick={onClick}>
              Volver al Login
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Home;
