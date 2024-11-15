import * as Yup from "yup";
export const validationSchemaNewActivitie = Yup.object({
  name: Yup.string().required("El nombre de la actividad es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  image: Yup.mixed().required("La imagen es obligatoria"),
  date: Yup.date().required("La fecha es obligatoria"),
  time: Yup.string().required("La hora es obligatoria"),
  place: Yup.string().required("El lugar es obligatorio"),
});
export default validationSchemaNewActivitie;
