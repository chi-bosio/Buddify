"use client";
import { useFormik } from "formik";
import validationSchemaLogin from "./components/validationSchema";
import postData from "./components/postData";
import React from 'react';
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";
import Swal from "sweetalert2";

const LoginForm = () => {
  const { login } = useAuthContext();
  const router = useRouter();


  const handleResetForm = () => {
    formik.resetForm();
  };

  const handleGoogleLogin = () => { 
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      Swal.fire({
        title: 'Cargando...',
        icon:"info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });


        const success = await postData(values);
      Swal.close();
        if (success.success) {
          if (success.token){
          login({token: success.token});
          }
          handleResetForm();
          router.push("/activities");
        }else {
          console.log('Error:', success.message);
        }
      }
});
  
  return (
    <div className="flex justify-end items-start h-screen"
    style={{ backgroundImage: 'url(/assets/fondo2.webp)' }}>

      <div className="flex justify-start items-center h-screen"
      
      >
        <form
          className="w-auto h-full bg-customPalette-white p-8"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-4xl font-bold text-customPalette-blue text-center mt-2 mb-24">
            Iniciar sesión
          </h1>

          <div className="input-group relative mb-14 w-full max-w-[400px] mx-auto">
            <InputWithLabel 
            formik={formik}
            name="username"
            type="text"
            text="Nombre de Usuario"
            />
          </div>
            
          <div className="input-group relative mb-6 w-full max-w-[400px] mx-auto">
            <InputWithLabel 
            formik={formik}
            name="password"
            type="password"
            text="Contraseña"
          />
          </div>

          <div className="mt-1 text-center">
            <a
              href="/recuperar-contraseña"
              className="text-customPalette-bluelink text-base hover:text-customPalette-bluelight"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>

            <SubmitButton 
              text="Ingresar"
            />
            <div className="mt-1 text-center">
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
            <div className="mt-10 text-center">  
            <button 
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Ingresa con Google
            </button>
            </div>
          </form>
        </div>
      </div>
  );

};

export default LoginForm;
