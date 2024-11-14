import * as Yup from "yup"; 
export const validationSchemaLogin = Yup.object({
    username: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido"),
  });

export default validationSchemaLogin;