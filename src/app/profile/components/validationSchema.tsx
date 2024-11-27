import * as Yup from "yup";
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  birthdate: Yup.date().required("La fecha de nacimiento es obligatoria"),
  country: Yup.string().required("El país es obligatorio"),
  city: Yup.string().required("La provincia es obligatoria"),
  dni: Yup.string().required("El DNI es obligatorio"),
});

export default validationSchema;
