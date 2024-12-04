import Toast, { TypeToast } from "@/components/Toast/Toast";
export async function getDataActivitiesCancelled(token:string|null){
    try{
        if(!token) return;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/activities/total-cancelled`;
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
              return 0;
    
        }else{
            return await response.json();
        }

    }catch(error) {
        let errorMessage = "Error del servidor";
      
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        Toast(TypeToast.Error,errorMessage)
        return 0;
    }
}

export default getDataActivitiesCancelled;