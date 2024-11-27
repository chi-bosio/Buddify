import { BadgeAlert, BadgeCheck, BadgeX, CheckCheck } from "lucide-react";
import moment, { Moment } from "moment";

export function InsignStatus({isCancell,isConfirm,isPendig,date}:{isPendig:boolean;isConfirm:boolean;isCancell:boolean;date:Moment;}){
  const currentDate = moment();
  const isDatePassed = moment(date).isBefore(currentDate);
  const statusMap = {
    cancelled: { borderColor: 'customPalette-red', textColor: 'customPalette-red' },
    pending: { borderColor: isDatePassed ? 'customPalette-red' : 'customPalette-graydark', textColor: isDatePassed ? 'customPalette-red' : 'customPalette-graydark' },
    confirmed: { borderColor: isDatePassed ? 'customPalette-orange' : 'customPalette-green', textColor: isDatePassed ? 'customPalette-orange' : 'customPalette-green' }
  };

  const status = isCancell ? 'cancelled' : isPendig ? 'pending' : 'confirmed';
  const { borderColor, textColor } = statusMap[status];

  return (
    <div className={`absolute top-1 right-1 bg-customPalette-white rounded-full border border-${borderColor}`}>
      {isCancell && <BadgeX className={`h-8 w-8 text-${textColor}`} />}
      {isPendig && (
        isDatePassed ? (
          <BadgeX className={`h-8 w-8 text-${textColor}`} />
        ) : (
          <BadgeAlert className={`h-8 w-8 text-${textColor}`} />
        )
      )}
      {isConfirm && (
        isDatePassed ? (
          <CheckCheck className={`h-8 w-8 text-${textColor}`} />
        ) : (
          <BadgeCheck className={`h-8 w-8 text-${textColor}`} />
        )
      )}
    </div>
  );
}


export default InsignStatus;