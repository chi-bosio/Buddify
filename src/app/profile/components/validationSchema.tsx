import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/,
      "El nombre no puede contener números ni caracteres especiales"
    ),
  lastname: Yup.string()
    .required("El apellido es obligatorio")
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/,
      "El apellido no puede contener números ni caracteres especiales"
    ),
  birthdate: Yup.date()
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha de nacimiento debe ser válida")
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
  country: Yup.string()
    .required("El país es obligatorio")
    .notOneOf([""], "Por favor selecciona una opción válida"),
  city: Yup.string()
    .required("La provincia es obligatoria")
    .notOneOf([""], "Por favor selecciona una opción válida"),
  dni: Yup.string()
    .required("El DNI es obligatorio")
    .matches(/^[0-9]{7,20}$/, "El DNI debe tener entre 7 y 20 dígitos"),
});

export default validationSchema;
