import Toast, { TypeToast } from "@/components/Toast/Toast";

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
      Toast(TypeToast.Error,errorData.message || "Error al iniciar sesión")
      return { success: false, message: errorData.message || "Error del servidor" };
    }

    const result = await response.json();


    if (!result.success) {
      Toast(TypeToast.Error,result.message || "Datos incompletos del servidor")
      return { success: false, message: result.message || "Datos incompletos del servidor" };
    }
    Toast(TypeToast.Success,result.message || "Inicio de sesión exitoso")

    if (result.success && result.access_token) {
      return { success: true, token: result.access_token };
    }

    return { success: false, message: "No se ha recibido un token" };
  } catch (error) {
    Toast(TypeToast.Error,"Error del servidor");
    
    return { success: false, message: "Error del servidor" };
  }
};

export default postData;
