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
        const success = await postData(values);
        if (success) handleResetForm();
    }
});
  const handleResetForm = () => {
    formik.resetForm();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div
        className="md:col-span-2 bg-contain bg-center h-full" 
        style={{ backgroundImage: 'url(/assets/fondo2.webp)' }}
      ></div>

      <div className="flex justify-center items-center h-full">
        <form
          className="w-full h-full bg-customPalette-white p-8"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-4xl font-bold text-customPalette-blue text-center mt-24 mb-24">
            Iniciar sesión
          </h1>

          <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full min-w-[200px] h-full p-4 pt-6 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-bluelink focus:border-customPalette-bluelightli text-customPalette-graydark text-xl"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute -top-3 left-2 bg-customPalette-white px-1 text-base font-medium text-customPalette-blue mt-1"
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
              className="peer w-full min-w-[200px] h-full p-4 pt-6 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-bluelink focus:border-customPalette-bluelightli text-customPalette-graydark text-xl"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute -top-3 left-2 bg-customPalette-white px-1 text-base font-medium text-customPalette-blue mt-1"
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
              className="text-customPalette-bluelink text-base hover:text-customPalette-bluelight"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-1/4 min-w-[150px] bg-customPalette-orange text-customPalette-white text-lg font-semibold py-3 px-8 rounded hover:bg-customPalette-orangebright mt-24 mb-6 mx-auto block"
          >
            Ingresar
          </button>

            <div className="mt-16 text-center">
            <p className="text-base text-customPalette-black">
              ¿Todavia no tenes cuenta?&nbsp;
              <a
                href="/register"
                className="text-customPalette-black text-lg hover:text-customPalette-bluedark underline"
              >
                Registrate
              </a>
            </p>  
            </div>   
          </form>
        </div>
      </div>
  );

};


export default LoginForm;
