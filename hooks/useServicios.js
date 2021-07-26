import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const useServicios = (orden) => {
  const [servicios, guardarServicios] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("servicios")
      .orderBy(orden, "desc")
      .onSnapshot(manejarSnapshot);

    const unsubscribe = productsQuery;

    const getProducts = async () => {
      await productsQuery;
    };

    getProducts();

    return () => {
      unsubscribe();
    };
  }, []);

  function manejarSnapshot(snapshot) {
    const servicios = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarServicios(servicios);
  }

  return {
    servicios,
  };
};

export default useServicios;
