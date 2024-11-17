import { toast } from "react-toastify";
import { UploadImageToCloudinary } from "./uploadImageToCloudinary";
import { Console } from "console";

export const PostData = async (activityData: any) => {
  try {
    if (!activityData.image) {
      throw new Error('La imagen es obligatoria.');
    }
   console.log(activityData);
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
        console.log(errorData);
        toast.error(errorData.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return false;

    }else{
        const result = await response.json();
        toast.success(result.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return true;
    }
  } catch (error) {
    const errorMessage = (error as any).message ? (error as any).message : "Error del servidor";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return false;
  }
};
