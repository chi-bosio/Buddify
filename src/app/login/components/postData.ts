import { toast } from "react-toastify";

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

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error al iniciar sesión", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return { success: false, message: errorData.message || "Error del servidor" };
    }

    const result = await response.json();


    if (!result.success) {
      toast.error(result.message || "Datos incompletos del servidor", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return { success: false, message: result.message || "Datos incompletos del servidor" };
    }

    toast.success(result.message || "Inicio de sesión exitoso", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    if (result.success && result.access_token) {
      return { success: true, token: result.access_token };
    }

    return { success: false, message: "No se ha recibido un token" };
  } catch (error) {
    toast.error("Error del servidor", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return { success: false, message: "Error del servidor" };
  }
};

export default postData;
