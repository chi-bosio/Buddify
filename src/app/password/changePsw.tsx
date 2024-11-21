"use client";

import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import validationSchema from "./components/validationSchema";

const ChangePsw = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    const result = await Swal.fire({
      title: "¿Cambiar contraseña?",
      text: "¿Estás seguro de querer cambiar tu contraseña?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const tokenData = localStorage.getItem("NEXT_JS_AUTH");
      const token = tokenData ? JSON.parse(tokenData).token : null;
      console.log("Token recuperado:", token);

      if (!token) {
        throw new Error("No se encontró el token de acceso.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          if (errorData.message === "El token ha expirado") {
            throw new Error(
              "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
            );
          } else if (errorData.message === "Token inválido") {
            throw new Error("El token de acceso es inválido.");
          }
        }
        throw new Error(errorData.message || "Error al cambiar la contraseña");
      }

      await Swal.fire({
        title: "Contraseña cambiada",
        text: "Tu contraseña ha sido actualizada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      resetForm();
    } catch (error: any) {
      console.error("Error en el cambio de contraseña:", error.message);
      await Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });

      if (error.message.includes("sesión ha expirado")) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <div
      className="flex justify-end items-start h-screen"
      style={{ backgroundImage: "url(/assets/fondo2.webp)" }}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="w-auto h-full bg-customPalette-white p-8 shadow-lg rounded-lg max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-customPalette-blue text-center mb-12">
                Cambiar contraseña
              </h1>

              <div className="relative mb-6">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Contraseña actual
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.currentPassword && errors.currentPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.currentPassword}
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.newPassword && errors.newPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.newPassword}
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Cambiar contraseña
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePsw;
