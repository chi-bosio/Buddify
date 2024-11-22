import Toast, { TypeToast } from "@/components/Toast/Toast";

type ResetPasswordData = {
  email: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message?: string;
};

export const postData = async (
  data: ResetPasswordData
): Promise<ResetPasswordResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/generate-reset-token`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      Toast(
        TypeToast.Error,
        errorData.message || "Error al solicitar recuperación de contraseña"
      );
      return {
        success: false,
        message: errorData.message || "Error del servidor",
      };
    }

    const result = await response.json();

    if (result.success === false) {
      Toast(
        TypeToast.Error,
        result.message || "Error al procesar la solicitud"
      );
      return {
        success: false,
        message: result.message || "Error al procesar la solicitud",
      };
    }

    Toast(
      TypeToast.Success,
      result.message ||
        "Te hemos enviado el enlace de recuperación de contraseña"
    );

    return { success: true, message: result.message || "Solicitud exitosa" };
  } catch (error) {
    let errorMessage = "Error del servidor";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    Toast(TypeToast.Error, errorMessage);

    return { success: false, message: errorMessage };
  }
};

export default postData;
