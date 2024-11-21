import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El correo electrónico es requerido"),
});

export default validationSchema;
