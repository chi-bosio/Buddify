import { BadgeAlert, BadgeCheck, BadgeX, CheckCheck } from "lucide-react";
import { ActivityStatus } from "../Interfaces/activity.interface";



export function InsignStatus({status}:{ status:ActivityStatus}) {
  const statusMap = {
    cancelled: {
      borderColor: "customPalette-red",
      textColor: "customPalette-red",
      icon: <BadgeX className="h-8 w-8 text-customPalette-red" />,
    },
    pending: {
      borderColor: "customPalette-graydark",
      textColor: "customPalette-graydark",
      icon: <BadgeAlert className="h-8 w-8 text-customPalette-graydark" />
    },
    confirmed: {
      borderColor: "customPalette-green",
      textColor: "customPalette-green",
      icon: <BadgeCheck className="h-8 w-8 text-customPalette-green" />
    },
    success: {
      borderColor: "customPalette-orange",
      textColor: "customPalette-orange",
      icon: <CheckCheck className="h-8 w-8 text-customPalette-orange" />,
    },
  };

  const { borderColor, icon } = statusMap[status] || {
    borderColor: "customPalette-gray",
    icon: null,
  };

  return (
    <div
      className={`absolute top-1 right-1 bg-customPalette-white rounded-full border border-${borderColor}`}
    >
      {icon}
    </div>
  );
}

export default InsignStatus;
