"use client";
import { useFormik } from "formik";
import postData from "./components/postData";
import Swal from "sweetalert2";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import validationSchema from "./components/validationSchema";

const RequestPasswordReset = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const success = await postData(values);

        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);
  
        setTimeout(() => {
          clearInterval(timeoutId); 
        }, 700);

        if (success.success) {
    
          setTimeout(() => {
            Swal.fire(
              "¡Éxito!",
              "Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu correo electrónico.",
              "success"
            );
            formik.resetForm();
          }, 900);
          
        } else {
          Swal.fire("Error", success.message, "error");
        }
      } catch (error) {
        Swal.close();
        Swal.fire("Error", "Hubo un problema con la solicitud", "error");
      }
    },
  });

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] flex justify-center items-center h-screen">
      <form
        className="w-full max-w-lg bg-customPalette-white p-8 rounded-lg shadow-lg "
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Recuperar contraseña
        </h1>

        <InputWithLabel
          formik={formik}
          name="email"
          type="email"
          text="Correo electrónico"
        />

        <SubmitButton text="Enviar enlace de recuperación" />
      </form>
    </div>
  );
};

export default RequestPasswordReset;
