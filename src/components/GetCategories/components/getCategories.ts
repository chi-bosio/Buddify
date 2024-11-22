import Toast, { TypeToast } from "@/components/Toast/Toast";

export const getCategories = async () => {
    try {
      const url= `${process.env.NEXT_PUBLIC_API_URL}/categories`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
            const errorData = await response.json();
            if(Array.isArray(errorData.message)){
            errorData.message.map((men:string)=>{
                Toast(TypeToast.Error,men);
            })
            }else{
              Toast(TypeToast.Error,errorData.message);

            }
            return null;
      }else{
            const result = await response.json();
            return result;
      }
    } catch (error:unknown) {
      let errorMessage = "Error del servidor";
      
      if (error instanceof Error) {
          errorMessage = error.message;
      }
      Toast(TypeToast.Error,errorMessage)
      return false;
    }
  }