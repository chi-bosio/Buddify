import { toast } from "react-toastify";

type data={
    username: string;
    password: string;
}
export const postData = async (data:data):Promise<boolean> =>{
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
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
export default postData;