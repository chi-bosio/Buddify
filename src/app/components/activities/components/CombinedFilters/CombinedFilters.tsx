"use client"
import { useFormik } from "formik";
import validationSchemaFilter from "./components/schemaValidation";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import GetCategories from "@/components/GetCategories/GetCategories";
import { useAuthContext } from "@/contexts/authContext";
import Toast, { TypeToast } from "@/components/Toast/Toast";
import { Activity } from "../../../../../components/Interfaces/activity.interface";
import moment from "moment";

export function CombinedFilters({setActivities}:{setActivities:(data:Activity[])=>void}){
    const {userId} = useAuthContext()
    const [latitude, setLatitude] = useState<number|null>(null);
    const [longitude, setLongitude] = useState<number|null>(null);
    const radius:{id:string;name:string;}[] = [
        {
            id:"50",
            name:"50km"
        },
        {
            id:"50",
            name:"100km"
        },
    ];
    const fetchActivities = async (
      {
        userId,
        latitude,
        longitude,
        radius,
        categoryId,
        dateStart,
        dateEnd
      }
      :
      {
        userId:string|null;
        latitude:number|null;
        longitude:number|null;
        radius?:string|null;
        categoryId?:string|null;
        dateStart?:string|null;
        dateEnd?:string|null;
      }
      )=>{
        try{
          const url = `${process.env.NEXT_PUBLIC_API_URL}/activities/search?userId=${userId}&latitude=${latitude}&longitude=${longitude}${radius ? `&radius=${radius}`:""}${categoryId? `&categoryId=${categoryId}`:""}${dateStart? `&dateStart=${dateStart}`: ""}${dateEnd? `&dateEnd=${dateEnd}`:""}`
          Swal.fire({
            title: 'Cargando...',
            icon:"info",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading(); 
            }
          });
          const response = await fetch(url);
          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);
          
          setTimeout(() => {
            clearInterval(timeoutId); 
          }, 500);
          
          if (!response.ok) {
            const errorData = await response.json();
            if(Array.isArray(errorData.message)){
              errorData.message.map((men:string)=>{
                Toast(TypeToast.Error,men);
              })
            }else{
              Toast(TypeToast.Error,errorData.message);
            }
          }else{
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data.data)) {
              setActivities(data.data); 
            } else {
              Toast(TypeToast.Error, "No se encontraron actividades.");
          }
        }
        }catch(error:unknown){
          const timeoutId = setTimeout(() => {
            Swal.close();
          }, 500);
          
          setTimeout(() => {
            clearInterval(timeoutId); 
          }, 500);
          let errorMessage = "Error del servidor";
    
          if (error instanceof Error) {
              errorMessage = error.message;
          }
          Toast(TypeToast.Error,errorMessage)
              }
      
  }
    const formik = useFormik({
        initialValues: {
          radius:"10",
          categoryId: "",
          dateStart: new Date().toISOString().split("T")[0],
          dateEnd:"",
        },
        validationSchema: validationSchemaFilter,
        onSubmit: async (values) => {
          const data = {...values, latitude, longitude,userId};
          fetchActivities({...data})
      }
    });
    const requestLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude)
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              Swal.fire({
                title: "Ubicación requerida",
                text: "Debes permitir el acceso a tu ubicación para crear una actividad.",
                icon: "warning",
                confirmButtonText: "Reintentar",
                allowOutsideClick:false
              }).then((result) => {
                if (result.isConfirmed) {
                  requestLocation(); 
                }
              });
            } else {
              console.error("Error al obtener la ubicación:", error);
            }
          }
        );
      },[])
    useEffect(()=>{
      requestLocation();
      if(userId && latitude && longitude){
        const dateStart = new Date().toISOString().split("T")[0];
        fetchActivities({userId,latitude,longitude,dateStart})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[requestLocation,userId,latitude, longitude])
    return (
        <form onSubmit={formik.handleSubmit} className="mb-4 flex items-start justify-start flex-col w-full">
            <div className="flex items-start justify-center w-full">
                <div className="mb-4 mr-3 flex items-start justify-start flex-col w-full">
                    <div className="flex items-center justify-around mb-3">
                      <div className="relative mr-3 flex justify-center items-center">
                          <label
                            htmlFor="radius"
                            className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1 w-full"
                          >
                            Radio en km
                          </label>
                          <select
                            id="radius"
                            name="radius"
                            value={formik.values.radius}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
                          >
                            <option value="10" className="text-customPalette-graydark">&nbsp;&nbsp;10km&nbsp;&nbsp;</option>
                            {radius.map((op, index) => (
                              <option key={index} value={op.id} className="text-customPalette-graydark">
                               &nbsp;&nbsp;{op.name}&nbsp;&nbsp;
                              </option>
                            ))}
                          </select>
                        </div>
                        <GetCategories formik={formik} />
                    </div>
                    
                    <div className="flex items-center justify-around">
                        <div className="relative mb-4 ">
                        <label
                            htmlFor="dateStart"
                            className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
                        >
                            Desde
                        </label>
                        <input
                            type="date"
                            id="dateStart"
                            name="dateStart"
                            value={formik.values.dateStart}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            min={moment().format("YYYY-MM-DD")}
                            className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
                        />
                        </div>
                        <div className="relative mb-4 ">
                        <label
                            htmlFor="dateEnd"
                            className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
                        >
                            Hasta
                        </label>
                        <input
                            type="date"
                            id="dateEnd"
                            name="dateEnd"
                            value={formik.values.dateEnd}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            min={formik.values.dateStart}
                            className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
                        />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center h-full">
                    <button
                    type="submit"
                    className="w-auto bg-customPalette-orange text-customPalette-white text-lg font-semibold py-3 px-3 rounded hover:bg-customPalette-orangebright  block"
                    >
                    <Search />
                    </button>

                </div>
            </div>
            <div className="flex items-center justify-center text-customPalette-red h-0.5 mt-1 mb-10 w-full">
                {
                formik.touched.dateStart ? formik.errors.dateStart ? (
                    <>{formik.errors.dateStart}</>
                ): null : 
                formik.touched.dateEnd ? formik.errors.dateEnd ? (
                    <>{formik.errors.dateEnd}</>
                ):null:null
                
                }
            </div>
            
        </form>
    );
}
export default CombinedFilters;