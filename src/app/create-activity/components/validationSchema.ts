import * as Yup from "yup";
export const validationSchemaNewActivitie = Yup.object({
  name: Yup.string().required("Requerido"),
  description: Yup.string().required("Requerido"),
  image: Yup.mixed()
    .required("Requerido")
    .test(
      "fileType",
      "El archivo debe ser una imagen (jpg, jpeg, png)",
      (value) => {
        if (value && value instanceof File) {
          return ["image/jpeg", "image/png"].includes(value.type);
        }
        return false; 
      }
    ),
  date: Yup.date().required("Requerido")
  .test(
    "isFutureDate",
    "La fecha no puede ser una fecha pasada",
    (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      return value >= today; 
    }
  ),
  time: Yup.string()
  .required("Requerido")
  .test(
    "isFutureTime",
    "La hora no puede ser anterior a la hora actual",
    (value, context) => {
      if (!value) return false;
      const selectedDate = context.parent.date;
      if (!selectedDate) return true;

      const today = new Date();
      const selectedDateTime = new Date(selectedDate);

      if (selectedDateTime.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        
        const [selectedHours, selectedMinutes] = value.split(":").map(Number);
        
        if (selectedHours < currentHours || (selectedHours === currentHours && selectedMinutes < currentMinutes)) {
          return false; 
        }
        
        return true;
      }
      return true;
    }
  ),
  place: Yup.string().required("Requerido"),
  categoryId: Yup.string().required("Requerido"),
});
export default validationSchemaNewActivitie;
