import { toast } from "react-toastify";
export enum TypeToast{
    Error="error",
    Success="success"
}
export function Toast(type:TypeToast,message:string){
    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
}

export default Toast;