import * as Yup from "yup";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required(
    "La contraseña actual es obligatoria."
  ),
  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria.")
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .matches(/[A-Z]/, "Debe incluir al menos una letra mayúscula.")
    .matches(/[0-9]/, "Debe incluir al menos un número.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Debe incluir al menos un carácter especial."
    )
    .matches(/^\S*$/, "La contraseña no debe contener espacios."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden.")
    .required("Debe confirmar la nueva contraseña."),
});

export default validationSchema;
