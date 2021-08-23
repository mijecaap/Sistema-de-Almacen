import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../firebase/context";

const useContratos = (orden) => {
  const [contratos, guardarContratos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("contratos")
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
    const contratos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarContratos(contratos);
  }

  return {
    contratos,
  };
};

export default useContratos;
