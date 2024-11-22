import * as Yup from "yup";

const validationSchemaCompleteProfile = Yup.object({
  birthdate: Yup.date()
    .required("Requerido")
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
    .required("Requerido")
    .notOneOf([''], 'Por favor selecciona una opción válida'),

  city: Yup.string()
    .required("Requerido")
    .notOneOf([''], 'Por favor selecciona una opción válida'),

  dni: Yup.string()
    .required("Requerido")
    .matches(/^[0-9]{7,20}$/, "El DNI debe tener entre 7 y 20 dígitos")
});

export default validationSchemaCompleteProfile;
