import Toast, { TypeToast } from "@/components/Toast/Toast";
import Swal from "sweetalert2";

type Data = {
  username: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

export const postData = async (data: Data): Promise<LoginResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.message && result.message.toLowerCase().includes("baneada")) {
        await Swal.fire({
          title: "Acceso denegado",
          text: "Tu cuenta ha sido suspendida. Si creés que esto es un error, por favor contactá a nuestro equipo de soporte en buddify907@gmail.com",
          icon: "error",
          confirmButtonText: "Entendido",
        });
        return { success: false, message: "Usuario baneado" };
      }

      Toast(TypeToast.Error, result.message || "Error al iniciar sesión");
      return {
        success: false,
        message: result.message || "Error del servidor",
      };
    }

    if (!result.success) {
      Toast(
        TypeToast.Error,
        result.message || "Datos incompletos del servidor"
      );
      return {
        success: false,
        message: result.message || "Datos incompletos del servidor",
      };
    }

    Toast(TypeToast.Success, result.message || "Inicio de sesión exitoso");

    if (result.access_token) {
      return { success: true, token: result.access_token };
    }

    return { success: false, message: "No se ha recibido un token" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error del servidor";
    Toast(TypeToast.Error, errorMessage);
    return { success: false, message: "Error del servidor" };
  }
};

export default postData;
