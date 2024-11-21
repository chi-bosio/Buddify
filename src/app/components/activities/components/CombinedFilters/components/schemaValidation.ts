import * as Yup from "yup";
import moment from "moment";

export const validationSchemaFilter = Yup.object({
  dateStart: Yup.string()
    .test(
      "is-before",
      "La fecha de inicio no puede ser posterior a la fecha de fin",
      function (value) {
        const { dateEnd } = this.parent;
        if (value && dateEnd) {
          return moment(value).isSameOrBefore(moment(dateEnd), "day");
        }
        return true;
      }
    )
    .test(
      "is-not-past",
      "La fecha de inicio no puede ser anterior a hoy",
      function (value) {
        if (value) {
          return moment(value).isSameOrAfter(moment(), "day"); 
        }
        return true;
      }
    ),

  dateEnd: Yup.string()
    .test(
      "is-after",
      "La fecha de fin no puede ser anterior a la fecha de inicio",
      function (value) {
        const { dateStart } = this.parent;
        if (value && dateStart) {
          return moment(value).isSameOrAfter(moment(dateStart), "day"); 
        }
        return true;
      }
    )
    .test(
      "is-not-past",
      "La fecha de fin no puede ser anterior a hoy",
      function (value) {
        if (value) {
          return moment(value).isSameOrAfter(moment(), "day"); 
        }
        return true;
      }
    ),
});

export default validationSchemaFilter;
