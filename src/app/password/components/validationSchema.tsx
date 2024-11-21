import * as Yup from "yup";
const validationSchema = Yup.object({
  currentPassword: Yup.string().required(
    "La contraseña actual es obligatoria."
  ),
  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria.")
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .matches(/[A-Z]/, "Debe incluir al menos una letra mayúscula.")
    .matches(/[0-9]/, "Debe incluir al menos un número."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Las contraseñas no coinciden.")
    .required("Debe confirmar la nueva contraseña."),
});

export default validationSchema;
