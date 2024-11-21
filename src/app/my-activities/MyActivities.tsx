"use client";

import { useEffect, useState } from "react";
import CalendarActivities from "./components/Calendar";
import { Activity } from "@/components/Interfaces/activity.interface";

export function MyActivities(){
    const [activities,setActivities] = useState<Activity[]>([]);
    useEffect(()=>{
        setActivities([])
    },[activities])
    return(
        <section 
            className="relative min-h-screen bg-[url('/assets/textura-fondo.avif')] bg-customPalette-white flex flex-col items-center justify-start w-full ">
            <div className="w-full h-full bg-customPalette-white">
            <CalendarActivities 
                activities={activities}
            />
            </div>  
        </section>
    )
}

export default MyActivities;