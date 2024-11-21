import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Debe incluir una mayúscula, una minúscula, un número y un carácter especial"
    )
    .required("Requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Requerido"),
});

export default validationSchema;
