import Toast, { TypeToast } from "@/components/Toast/Toast";

export const getActivities = async (userId:string|null) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/activities/user/${userId}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Toast(TypeToast.Error,errorData.message);
        return {created:[],joined:[]};
      }else{
        const result = await response.json();
        return result;
      }
  
    } catch (error) {
      let errorMessage = "Error del servidor";
      
      if (error instanceof Error) {
          errorMessage = error.message;
      }
      Toast(TypeToast.Error,errorMessage)
      
      return { success: false, message: "Error del servidor" };
    }
  };
  
  export default getActivities;