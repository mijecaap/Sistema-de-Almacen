import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const usePersonal = (orden) => {
  const [empleados, guardarMateriales] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("empleados")
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
    const empleados = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarMateriales(empleados);
  }

  return {
    empleados,
  };
};

export default usePersonal;
