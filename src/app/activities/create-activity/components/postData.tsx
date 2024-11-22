import Toast, { TypeToast } from "@/components/Toast/Toast";

export const PostData = async (activityData: any) => {
  try {
    const url= `${process.env.NEXT_PUBLIC_API_URL}/activities`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if(Array.isArray(errorData.message)){
          errorData.message.map((men: string)=>{
            Toast(TypeToast.Error,men);
          })
        }
        Toast(TypeToast.Error,errorData.message);
          return false;

    }else{
        const result = await response.json();
        Toast(TypeToast.Success,result.message);
        return true;
    }
  } catch (error) {
    const errorMessage = (error as any).message ? (error as any).message : "Error del servidor";
    Toast(TypeToast.Error,errorMessage)
    return false;
  }
};
