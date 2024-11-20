import { FormikProps } from "formik";

export function Filter(
    {
        name,
        formik,
        options,
        text,
    }:{
        options:{id:string;name:string;}[];
        name:string;
        formik: FormikProps<any>,
        text:string;
    }
){
    return(
        <div className="relative mb-4 mr-3">
              <label
                htmlFor={name}
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-[var(--custom-blue)] mt-1"
              >
                {text}
              </label>
              <select
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
              >
                {options.map((op, index) => (
                  <option key={index} value={op.id}>
                    {op.name}
                  </option>
                ))}
              </select>
            </div>
    );
}

export default Filter;