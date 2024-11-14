import * as Yup from "yup";

 const validationSchema =  Yup.object({
    name: Yup.string().required("Requerido"),
    lastname: Yup.string().required("Requerido"),
    birthdate: Yup.date().required("Requerido"),
    country: Yup.string().required("Requerido"),
    province: Yup.string().required("Requerido"),
    email: Yup.string().email("Correo inválido").required("Requerido"),
    username: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido"),
    dni: Yup.string().required("Requerido"),
  });

  export default validationSchema;

