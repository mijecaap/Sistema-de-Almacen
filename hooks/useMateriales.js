import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const useMateriales = (orden) => {
  const [materiales, guardarMateriales] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("materiales")
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
    const materiales = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarMateriales(materiales);
  }

  return {
    materiales,
  };
};

export default useMateriales;
