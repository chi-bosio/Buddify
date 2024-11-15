import * as Yup from "yup";

 const validationSchemaRegister =  Yup.object({
    name: Yup.string()
    .required("Requerido")
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre no puede contener números ni caracteres especiales"),
    lastname: Yup.string()
    .required("Requerido")
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, "El apellido no puede contener números ni caracteres especiales"),
    birthdate: Yup.date()
    .required("Requerido")
    .max(new Date(), "La fecha de nacimiento debe ser valida")
    .test("age", "Debes ser mayor de 18 años", (value) => {
      const today = new Date();
      const birthdate = new Date(value);
      const age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        return age > 18;
      }
      return age >= 18;
    }),
    country: Yup.string().required("Requerido").notOneOf([''], 'Por favor selecciona una opción válida'),
    city: Yup.string().required("Requerido").notOneOf([''], 'Por favor selecciona una opción válida'),
    email: Yup.string().email("Correo inválido").required("Requerido"),
    username: Yup.string().required("Requerido"),
    password: Yup.string()
    .required("Requerido")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial"),
    dni: Yup.string()
    .required("Requerido")
    .matches(/^[0-9]{7,20}$/, "El dni debe tener entre 7 y 20 dígitos")
  });

  export default validationSchemaRegister;

