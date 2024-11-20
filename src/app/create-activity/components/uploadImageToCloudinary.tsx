import Toast, { TypeToast } from "@/components/Toast/Toast";

export const UploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
  formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''); 

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      Toast(TypeToast.Error,errorData.message)
      return '';
    }else{
      const result = await response.json();
      Toast(TypeToast.Success,result.message);
      return result.secure_url;
  }
  } catch (error) {
    let errorMessage = "Error al subir la imagen";
    
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    Toast(TypeToast.Error,errorMessage);
    return '';
  }
};


