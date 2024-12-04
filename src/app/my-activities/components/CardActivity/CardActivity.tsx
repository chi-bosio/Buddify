/* eslint-disable @next/next/no-img-element */
"use client";
import InsignStatus from "@/components/InsingStatus/InsingStatus";
import {
    Activity,
    ActivityStatus,
} from "@/components/Interfaces/activity.interface";
import { Eye, Trash2, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";


export function CardActivity({ activity, handlerOnView, handlerOnCancel }: { activity: Activity; handlerOnView: () => void; handlerOnCancel: () => void }) {

    const router = useRouter();

    const handleChat = () => {
        router.push(`/chat?activityId=${activity.id}`);
    };

    const isActivityActive =
        activity.status === ActivityStatus.PENDING ||
        activity.status === ActivityStatus.CONFIRMED;

    return (
        <div className={` flex flex-col items-start justify-end w-full rounded h-48 bg-customPalette-white shadow-lg border border-customPalette-gray py-2 px-2`}>
            <div className="relative h-full w-full rounded overflow-hidden">
                <InsignStatus status={activity.status as ActivityStatus} />
                <img
                    alt={`imagen-${activity.name}`}
                    src={activity.image}
                    className="h-full w-full rounded"
                />
                <div className="z-20 absolute bottom-0 left-0 flex justify-between items-center w-full bg-customPalette-whitelight px-2 py-2">
                    <h4 className="font-semibold text-base text-customPalette-blue ">{activity.name}</h4>
                    <div className="flex justify-between items-center">
                        <Eye className="h-6 w-6 mr-4 text-customPalette-blue hover:text-customPalette-bluelight cursor-pointer" onClick={handlerOnView}></Eye>

                        {isActivityActive && (
                            <MessageCircle
                                className="h-6 w-6 mr-4 text-customPalette-green hover:text-customPalette-greenlight cursor-pointer"
                                onClick={handleChat}
                            ></MessageCircle>
                        )}

                        <Trash2
                            className={`h-6 w-6  ${activity.status !== ActivityStatus.CANCELLED && activity.status !== ActivityStatus.SUCCESS ? "text-customPalette-red hover:text-customPalette-redlight cursor-pointer" : "text-customPalette-graydark cursor-not-allowed"}`}
                            onClick={activity.status !== ActivityStatus.CANCELLED && activity.status !== ActivityStatus.SUCCESS ? handlerOnCancel : undefined}
                        ></Trash2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardActivity;
