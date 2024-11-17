import * as Yup from "yup";
export const validationSchemaNewActivitie = Yup.object({
  name: Yup.string().required("Requerido"),
  description: Yup.string().required("Requerido"),
  image: Yup.mixed().required("Requerido"),
  date: Yup.date().required("Requerido"),
  time: Yup.string().required("Requerido"),
  place: Yup.string().required("Requerido"),
});
export default validationSchemaNewActivitie;
