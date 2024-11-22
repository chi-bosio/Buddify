/* eslint-disable @next/next/no-img-element */
"use client"
import { Eye, Trash2 } from "lucide-react";
export function CardActivity ({image,name,handlerOnView,handlerOnCancel}:{image:string;name:string;handlerOnView:()=>void;handlerOnCancel:()=>void}){

    return(
        <div className={` flex flex-col items-start justify-end w-full rounded h-48 bg-customPalette-white shadow-lg border border-customPalette-gray py-2 px-2`}>
            <div className="relative h-full w-full rounded overflow-hidden">
                <img 
                alt={`imagen-${name}`}
                src={image}
                className="h-full w-full rounded"
                />
            <div className="z-20 absolute bottom-0 left-0 flex justify-between items-center w-full bg-customPalette-whitelight px-2 py-2">
                <h4 className="font-semibold text-base text-customPalette-blue ">{name}</h4>    
                <div className="flex justify-between items-center">
                    <Eye className="h-6 w-6 mr-4 text-customPalette-blue" onClick={handlerOnView}></Eye>
                    <Trash2 className="h-6 w-6 text-customPalette-red" onClick={handlerOnCancel}></Trash2>
                </div>
            </div>
            </div>
        </div>
    );

}

export default CardActivity ;