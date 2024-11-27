/* eslint-disable @next/next/no-img-element */
"use client"
import InsignStatus from "@/components/InsingStatus/InsingStatus";
import { Activity, ActivityStatus } from "@/components/Interfaces/activity.interface";
import { Eye, Trash2 } from "lucide-react";
import moment from "moment";
export function CardActivity ({activity,handlerOnView,handlerOnCancel}:{activity:Activity;handlerOnView:()=>void;handlerOnCancel:()=>void}){
    const hours = Number(activity.time.split(":")[0]);
    const minutes = Number(activity.time.split(":")[1]);
    const actDate = new Date(activity.date);
    const formatDate  = moment(actDate).set({ hour: hours, minute: minutes });
    return(
        <div className={` flex flex-col items-start justify-end w-full rounded h-48 bg-customPalette-white shadow-lg border border-customPalette-gray py-2 px-2`}>
            <div className="relative h-full w-full rounded overflow-hidden">
                <InsignStatus 
                    isCancell={activity.status === ActivityStatus.CANCELLED} 
                    isConfirm={activity.status === ActivityStatus.CONFIRMED}
                    isPendig={activity.status === ActivityStatus.PENDING}
                    date={formatDate} />
                <img 
                alt={`imagen-${activity.name}`}
                src={activity.image}
                className="h-full w-full rounded"
                />
            <div className="z-20 absolute bottom-0 left-0 flex justify-between items-center w-full bg-customPalette-whitelight px-2 py-2">
                <h4 className="font-semibold text-base text-customPalette-blue ">{activity.name}</h4>    
                <div className="flex justify-between items-center">
                    <Eye className="h-6 w-6 mr-4 text-customPalette-blue hover:text-customPalette-bluelight cursor-pointer" onClick={handlerOnView}></Eye>
                    <Trash2 className="h-6 w-6 text-customPalette-red hover:text-customPalette-redlight cursor-pointer " onClick={handlerOnCancel}></Trash2>
                </div>
            </div>
            </div>
        </div>
    );

}

export default CardActivity ;