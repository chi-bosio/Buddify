import { toast } from "react-toastify";

type data={
    name: string,
    lastname: string,
    birthdate: string,
    country: string,
    city: string,
    email: string,
    username: string,
    password: string,
    dni: string,
}
export const postData = async (values:data):Promise<boolean> =>{
    const data = { ...values, birthdate: new Date(values.birthdate) };
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
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