import * as Yup from "yup";

const validationSchema = Yup.object({
  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "Debe tener al menos 10 caracteres"),
});

export default validationSchema;
