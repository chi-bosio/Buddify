import Toast, { TypeToast } from "@/components/Toast/Toast";

export const cancellActivity = async (userId: string,activityId:string) => {
  try{
    const url = `${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}/cancell/${userId}`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          return false;

    }else{
        return true;
    }

}catch(error) {
    let errorMessage = "Error del servidor";
  
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    Toast(TypeToast.Error,errorMessage)
    return false;
}
};

