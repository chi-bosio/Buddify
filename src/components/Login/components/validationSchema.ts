import * as Yup from "yup"; 
export const validationSchema = Yup.object({
    username: Yup.string()
      .required("Nombre de Usuario es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria"),
  });

export default validationSchema;