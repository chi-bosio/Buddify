"use client";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import validationSchema from "./components/validationSchema";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";
import postData from "./components/postData";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

const ChangePsw = () => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { currentPassword, newPassword, confirmPassword } = values;

      try {
        const result = await Swal.fire({
          title: "¿Cambiar contraseña?",
          text: "¿Desea cambiar su contraseña?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f97316",
          cancelButtonColor: "#235789",
          confirmButtonText: "Cambiar",
          cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) {
          return;
        }
        Swal.fire({
          title: "Cargando...",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const success = await postData({
          currentPassword,
          newPassword,
          confirmPassword,
        });
        const timeoutId = setTimeout(() => {
          Swal.close();
        }, 500);

        setTimeout(() => {
          clearInterval(timeoutId);
        }, 700);
        if (success) {
          setTimeout(() => {
            resetForm();
            logout();
            router.push("/login");
          }, 900);
        }
      } catch (error) {
        await Swal.fire({
          title: "Error",
          text: (error as Error).message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });

        if ((error as Error).message.includes("Su sesión ha expirado")) {
          window.location.href = "/login";
        }
      }
    },
  });

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Cambiar contraseña
        </h1>
        <form onSubmit={formik.handleSubmit} className="w-full max-w-4xl p-8">
          <div className="space-y-6">
            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="currentPassword"
                type="password"
                text="Contraseña actual"
              />
            </div>
            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="newPassword"
                type="password"
                text="Nueva Contraseña"
              />
            </div>
            <div className="relative">
              <InputWithLabel
                formik={formik}
                name="confirmPassword"
                type="password"
                text="Confirmar nueva contraseña"
              />
            </div>
          </div>

          <SubmitButton text="Cambiar contraseña" />
        </form>
      </div>
    </div>
  );
};
export default ChangePsw;
