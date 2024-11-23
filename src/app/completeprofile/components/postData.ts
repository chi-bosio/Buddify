import Toast, { TypeToast } from "@/components/Toast/Toast";
import { jwtDecode } from "jwt-decode";

type data = {
  birthdate: string;
  country: string;
  city: string;
  dni: string;
  userId?: string;
};

export const postData = async (values: data): Promise<boolean> => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL no está definida en el entorno.");
    }
  
    const storedToken = localStorage.getItem("NEXT_JS_AUTH");
    const token = storedToken ? JSON.parse(storedToken).token : null;
  
    if (!token) {
      console.error("Token no encontrado en localStorage.");
      return false;
    }
  
  let userId: string | null = null;

  try {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.sub; 
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }

  if (!userId) {
    console.error("ID del usuario no encontrado en el token.");
    return false;
  }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/completeprofile`;
    
    const data = { ...values, userId, birthdate: new Date(values.birthdate) };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Toast(TypeToast.Error, errorData.message);
        return false;
      } else {
        const result = await response.json();
        Toast(TypeToast.Success, result.message);
        return true;
      }
    } catch (error) {
      const errorMessage = (error as any).message ? (error as any).message : "Error del servidor";
      Toast(TypeToast.Error, errorMessage);
      return false;
    }
  };

export default postData;
