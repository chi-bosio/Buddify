import Toast, { TypeToast } from "@/components/Toast/Toast";
export async function getDataEarnings(token:string|null){
    try{
        if(!token) return;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/stripe/earnings`;
        const response = await fetch(url, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
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
              return [];
    
        }else{
            return await response.json();
        }

    }catch(error) {
        let errorMessage = "Error del servidor";
      
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        Toast(TypeToast.Error,errorMessage)
        return [];
    }
}

export default getDataEarnings;