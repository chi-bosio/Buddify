"use client"
import { useFormik } from "formik";
import Filter from "./components/Filter/Filter";
import validationSchemaFilter from "./components/schemaValidation";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

export function CombinedFilters(){
    const [latitude, setLatitude] = useState<number|null>(null);
    const [longitude, setLongitude] = useState<number|null>(null);
    const radius:{id:string;name:string;}[] = [
        {
            id:"10",
            name:"10km"
        },
        {
            id:"50",
            name:"50km"
        },
        {
            id:"50",
            name:"100km"
        },
    ];
    const categories:{id:string;name:string;}[] = [
        {
            id:"0",
            name:"Selecciona una categoria"
        },
        {
            id:"4",
            name:"Ramdom"
        },
        {
            id:"5",
            name:"Fulbo"
        },
        {
            id:"6",
            name:"Cine"
        },
    ];
    const formik = useFormik({
        initialValues: {
          radius:"10",
          category: "",
          dateinit: "",
          dateend:"",
        },
        validationSchema: validationSchemaFilter,
        onSubmit: async (values) => {
            const data = {...values, latitude, longitude};
          console.log({data})
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
      },[requestLocation])
    return (
        <form onSubmit={formik.handleSubmit} className="mb-4 flex items-start justify-start flex-col w-full">
            <div className="flex items-start justify-center w-full">
                <div className="mb-4 flex items-start justify-start flex-col w-full">
                    <div className="flex items-center justify-around">
                        <Filter 
                            formik={formik}
                            options={radius}
                            name="radius"
                            text="Radio km"
                        />
                        <Filter 
                            formik={formik}
                            options={categories}
                            name="category"
                            text="Categoria"
                        />
                    </div>
                    
                    <div className="flex items-center justify-around">
                        <div className="relative mb-4 ">
                        <label
                            htmlFor="dateinit"
                            className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
                        >
                            Desde
                        </label>
                        <input
                            type="date"
                            id="dateinit"
                            name="dateinit"
                            value={formik.values.dateinit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
                        />
                        </div>
                        <div className="relative mb-4 ">
                        <label
                            htmlFor="dateend"
                            className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
                        >
                            Hasta
                        </label>
                        <input
                            type="date"
                            id="dateend"
                            name="dateend"
                            value={formik.values.dateend}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                formik.touched.dateinit ? formik.errors.dateinit ? (
                    <>{formik.errors.dateinit}</>
                ): null : 
                formik.touched.dateend ? formik.errors.dateend ? (
                    <>{formik.errors.dateend}</>
                ):null:null
                
                }
            </div>
            
        </form>
    );
}

export default CombinedFilters;