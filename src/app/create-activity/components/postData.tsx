import { toast } from "react-toastify";
import { UploadImageToCloudinary } from "./uploadImageToCloudinary";

export const PostData = async (activityData: any) => {
  try {
    if (!activityData.image) {
      throw new Error('La imagen es obligatoria.');
    }
    const imageUrl = await UploadImageToCloudinary(activityData.image);

    const activityWithImage = {
      ...activityData,
      imageUrl, 
    };
    const response = await fetch('http://localhost:3000/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityWithImage),
    });

    if (!response.ok) {
        const errorData = await response.json();
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
