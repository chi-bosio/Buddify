"use client";
import { useFormik } from "formik";
import validationSchema from "./components/validationSchema";


const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema ,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div
        className="md:col-span-2 bg-cover bg-center h-full"
        style={{ backgroundImage: 'url(/assets/fondoLanding.png)' }}
      ></div>

      <div className="flex justify-center items-center h-full">
        <form
          className="w-full h-full bg-[rgba(255,255,255,0.9)] p-8"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-4xl font-bold text-gray-700 text-center mt-24 mb-24">
            Iniciar sesión
          </h2>
          <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              required
              className="peer w-full min-w-[200px] h-full p-4 pt-8 border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-300 text-black text-xl"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute left-5 -top-0 text-lg font-medium text-gray-600 transition-all duration-300 ease-in-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-0 peer-focus:left-3 peer-focus:text-lg peer-focus:text-gray-700"
            >
              Nombre de Usuario
            </label>
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-600 ">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="peer w-full min-w-[200px] h-full p-4 pt-8 border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-300 text-black text-xl"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-5 -top-0 text-lg font-medium text-gray-600 transition-all duration-300 ease-in-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-0 peer-focus:left-3 peer-focus:text-lg peer-focus:text-gray-700"
            >
              Contraseña
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 ">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-8 text-center">
            <a
              href="/recuperar-contraseña"
              className="text-blue-600 text-base hover:text-blue-700"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-1/4 min-w-[150px] bg-customPalette-orange text-white text-lg font-semibold py-3 px-8 rounded hover:bg-customPalette-orange mt-24 mx-auto block"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
