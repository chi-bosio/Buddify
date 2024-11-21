import * as Yup from "yup"; 

export const validationSchemaFilter = Yup.object({
  dateStart: Yup.string()
    .test('is-before', 'La fecha de inicio no puede ser posterior a la fecha de fin', function(value) {
      const { dateend } = this.parent;  
      if (value && dateend) {
        return new Date(value) <= new Date(dateend); 
      }
      return true;
    })
    .test('is-not-past', 'La fecha de inicio no puede ser anterior a hoy', function(value) {
      if (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
      }
      return true;
    }),
  
    dateEnd: Yup.string()
    .test('is-after', 'La fecha de fin no puede ser anterior a la fecha de inicio', function(value) {
      const { dateinit } = this.parent;  
      if (value && dateinit) {
        return new Date(value) >= new Date(dateinit);  
      }
      return true; 
    })
    .test('is-not-past', 'La fecha de fin no puede ser anterior a hoy', function(value) {
      if (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
      }
      return true;
    }),
});

export default validationSchemaFilter;
