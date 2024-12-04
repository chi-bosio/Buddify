"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import postData from "./components/postData";
import validationSchema from "./components/validationSchema";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromURL = queryParams.get("tokenreset");

    if (!tokenFromURL) {
      Swal.fire("Error", "Token inválido o inexistente", "error");
      router.push("/login");
    } else {
      setToken(tokenFromURL);
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await Swal.fire({
          title: "¿Cambiar contraseña?",
          text: "¿Desea cambiar su contraseña y continuar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f97316",
          cancelButtonColor: "#235789",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
          const success = await postData({
            newPassword: values.password,
            token: token!,
          });
          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);

          setTimeout(() => {
            clearInterval(timeoutId);
          }, 700);
          if (success.success) {
            setTimeout(() => {
              router.push("/login");
            }, 900);
          }
        }
      } catch (error) {
        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);

        setTimeout(() => {
          clearInterval(timeoutId);
        }, 700);
        Swal.fire("Error", "Hubo un problema con la solicitud", "error");
      }
    },
  });

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-xl text-customPalette-blue">
          Validando token...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] flex justify-center items-center h-screen">
      <form
        className="w-full max-w-lg bg-customPalette-white p-8 rounded-lg shadow-lg"
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Restablecer Contraseña
        </h1>

        <InputWithLabel
          formik={formik}
          name="password"
          type="password"
          text="Nueva Contraseña"
        />

        <InputWithLabel
          formik={formik}
          name="confirmPassword"
          type="password"
          text="Confirmar Contraseña"
        />

        <SubmitButton text="Restablecer Contraseña" />
      </form>
    </div>
  );
};

export default ResetPassword;
