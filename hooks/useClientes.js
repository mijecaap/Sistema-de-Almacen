import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../firebase/context";

const useClientes = (orden) => {
  const [clientes, guardarMateriales] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("clientes")
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
    const clientes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarMateriales(clientes);
  }

  return {
    clientes,
  };
};

export default useClientes;
