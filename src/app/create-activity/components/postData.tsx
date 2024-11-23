import Toast, { TypeToast } from "@/components/Toast/Toast";
interface ActivityData{
  name: string,
  description: string,
  image: null | string,
  date: string,
  time: string,
  place:string,
  creatorId:string|null,
  latitude:string,
  longitude:string,
}
export const PostData = async (activityData: ActivityData) => {
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
          errorData.message.map((men:string)=>{
            Toast(TypeToast.Error,men);
          })
        }else{
          Toast(TypeToast.Error,errorData.message);
        }
          return false;

    }else{
        const result = await response.json();
        Toast(TypeToast.Success,result.message);
        return true;
    }
  } catch (error:unknown) {
    let errorMessage = "Error del servidor";
    
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    Toast(TypeToast.Error,errorMessage)
    return false;
  }
};
