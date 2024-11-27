type ResetPasswordData = {
  newPassword: string;
  token: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message?: string;
};

export const postData = async (
  data: ResetPasswordData
): Promise<ResetPasswordResponse> => {
  if (!data.token) {
    return {
      success: false,
      message: "El token de restablecimiento no es válido",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?token=${data.token}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: data.newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Error al restablecer la contraseña",
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: result.message || "Contraseña restablecida con éxito",
    };
  } catch (error) {
    let errorMessage = "Error del servidor";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
};

export default postData;
