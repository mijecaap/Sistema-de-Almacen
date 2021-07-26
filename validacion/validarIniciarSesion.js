export default function validarIniciarSesion(valores) {
    let errores = {};

    // Validar el email
    if (!valores.email) {
      errores.email = "El Emaiil es Obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
      errores.email = "Email no válido";
    }
  
    // Validar el password
    if (!valores.password) {
      errores.password = "El Password es Obligatorio";
    } else if (valores.password.length < 6) {
      errores.password = "El Password debe ser de al menos 6 caracteres";
    }
  
    return errores;
  }
  