"use client"

import { Crown } from "@/components/Crown/crown";
import InsignStatus from "@/components/InsingStatus/InsingStatus";
import { ActivityStatus } from "@/components/Interfaces/activity.interface";

/* eslint-disable @next/next/no-img-element */

export function CardActivity({
    onClick,
    name,
    description,
    image,
    creator,
    category,
    status,
}:
{
    date:string;
    status:string;
    time:string;
    onClick: () => void;
    name: string;
    description: string;
    image: string;
    creator: {
      name: string;
      lastname: string;
      avatar:string;
      isPremium:boolean;
    }
    category: {id:string;name:string};
}
){
    return (
        <div onClick={onClick} className="cursor-pointer hover:blur-[.5px] bg-customPalette-gray rounded-lg w-full p-4 mb-10 shadow-lg border border-customPalette-gray">
          <div className="relative flex items-center justify-start text-gray-500 mb-2">
            
            <InsignStatus status={status as ActivityStatus} />
            <div className="relative">
              <img 
                src={creator.avatar} 
                className="relative w-8 h-8 mr-2 rounded-full bg-gray-600 flex items-center justify-center" 
                alt={`avatar-${creator.name}-${creator.lastname}`}
                />
                <Crown isPremium={creator.isPremium} className="-top-2.5 -left-2.5"/>
            </div>
              <span>{ `${creator.name} ${creator.lastname}`}</span>
          </div> 
          <div className="w-full h-full flex items-start justify-start flex-col">
                  <h3 className="text-2xl font-semibold text-customPalette-bluedark mb-2 w-full">
                    {name}
                  </h3>
                  <span className="text-center bg-customPalette-orange rounded px-2 py1 mb-2">{category.name}</span>
                    <img
                      src={image}
                      alt={`ubicacion-${name}`}
                      className="w-full h-48 object-cover"
                  />
                  <p className="w-full text-customPalette-graydark mb-4">
                      {description}
                  </p>
            </div>
        </div>
    );
}

export default CardActivity;
