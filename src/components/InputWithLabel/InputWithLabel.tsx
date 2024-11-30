/* eslint-disable @next/next/no-img-element */
import { FormikProps } from "formik";
import ErrorMessageForm from "../ErrorMessageForm/ErrorMessageForm";
import { useState } from "react";

export function InputWithLabel({
  name,
  type,
  formik,
  text,
  disabled,
  max
}: {
  name: string;
  type: string;
  formik: FormikProps<any>;
  text: string;
  disabled?: boolean;
  max?:string
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  if (disabled === undefined) {
    disabled = false;
  }

  return (
    <div className="transition-all ease-in-out duration-300 relative mb-12">
      <label
        htmlFor={name}
        className={`${disabled && "cursor-not-allowed opacity-80"} transition-all ease-in-out duration-300 z-10 absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1`}
      >
        {text}
      </label>
      <input
        max={max ? max : undefined}
        type={showPassword ? "text" : type}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={disabled}
        className={`${disabled && "cursor-not-allowed opacity-80"} transition-all ease-in-out duration-300 block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-2 top-1"
        >
          <img
            src={
              showPassword
                ? "/assets/ojosabierto.png"
                : "/assets/ojoscerrado.png"
            }
            alt={showPassword ? "Ojo cerrado" : "Ojo abierto"}
            className="w-9 h-9 transition-all ease-in-out duration-300"
          />
        </button>
      )}

      <ErrorMessageForm formik={formik} input={name} />
    </div>
  );
}
export default InputWithLabel;
