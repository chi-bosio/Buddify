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
}: {
  name: string;
  type: string;
  formik: FormikProps<any>;
  text: string;
  disabled?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  if (disabled === undefined) {
    disabled = false;
  }

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
      >
        {text}
      </label>
      <input
        type={showPassword ? "text" : type}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-3 top-1"
        >
          <img
            src={
              showPassword
                ? "/assets/ojosabierto.png"
                : "/assets/ojoscerrado.png"
            }
            alt={showPassword ? "Ojo cerrado" : "Ojo abierto"}
            className="w-9 h-9"
          />
        </button>
      )}

      <ErrorMessageForm formik={formik} input={name} />
    </div>
  );
} 
export default InputWithLabel;
