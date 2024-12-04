type PasswordChangeData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const postData = async (data: PasswordChangeData): Promise<boolean> => {
  const tokenData = localStorage.getItem("NEXT_JS_AUTH");
  const token = tokenData ? JSON.parse(tokenData).token : null;

  if (!token) {
    throw new Error("No se encontró el token de acceso.");
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        if (errorData.message === "El token ha expirado") {
          throw new Error(
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
          );
        } else if (errorData.message === "Token inválido") {
          throw new Error("El token de acceso es inválido.");
        }
      }
      throw new Error(errorData.message || "Error al cambiar la contraseña");
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default postData;
