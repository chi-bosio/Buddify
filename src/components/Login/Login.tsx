"use client";
import { useFormik } from "formik";
import validationSchemaLogin from "./components/validationSchema";
import postData from "./components/postData";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      if(confirm("¿Revisaste todos los campos capo?"))
        if(await postData(values))
          handleResetForm();
          /// redireccionar o algo
    },
  });
  const handleResetForm = () => {
    formik.resetForm();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div
        className="md:col-span-2 bg-cover bg-center h-full"
        style={{ backgroundImage: "url(/assets/fondoLanding.png)" }}
      ></div>

      <div className="flex justify-center items-center h-full">
        <form
          className="w-full h-full bg-[var(--custom-white)] p-8"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-4xl font-bold text-[var(--custom-gray-dark)] text-center mt-24 mb-24">
            Iniciar sesión
          </h2>

          <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full min-w-[200px] h-full p-4 pt-6 border border-black rounded-md shadow-sm focus:ring-[var(--custom-blue-500)] focus:border-[var(--custom-blue-300)] text-black text-xl"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-base font-medium text-[var(--custom-gray-dark)] mt-1"
            >
              Nombre de Usuario
            </label>
            {formik.touched.username && formik.errors.username && (
              <div className="text-customPalette-red">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="input-group relative mb-6 w-full max-w-[400px] mx-auto">
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full min-w-[200px] h-full p-4 pt-6 border border-black rounded-md shadow-sm focus:ring-[var(--custom-blue-500)] focus:border-[var(--custom-blue-300)] text-black text-xl"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute -top-3 left-2 bg-[var(--custom-white)] px-1 text-base font-medium text-[var(--custom-gray-dark)] mt-1"
            >
              Contraseña
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className="text-customPalette-red">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/recuperar-contraseña"
              className="text-[var(--custom-blue-500)] text-base hover:text-[var(--custom-blue-700)]"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-1/4 min-w-[150px] bg-customPalette-orange text-[var(--custom-white)] text-lg font-semibold py-3 px-8 rounded hover:bg-customPalette-orange mt-24 mb-6 mx-auto block"
          >
            Ingresar
          </button>

          <div className="mt-16 text-center">
            <p className="text-base text-[var(--custom-black)]">
              ¿Todavía no tienes cuenta?&nbsp;
              <a
                href="/register"
                className="text-[var(--custom-blue-600)] text-lg hover:text-[var(--custom-blue-800)]"
              >
                Registrarse
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
