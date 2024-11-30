import {  BadgeCheck, BadgeHelp, BadgeMinus, BadgeX, } from "lucide-react";

export function ModalInsingStatus({bol = false}:{bol:boolean;}){
    return (
        <div className="mb-5 lg:mb-0 lg:mr-5 px-4 py-2 rounded bg-customPalette-white shadow-lg border border-customPalette-white h-80">
            <h3 className="font-bold lg:font-semibold text-customPalette-blue text-sm mb-4 w-full text-start">Ayuda visual</h3>
            
            { bol && 
                <>
                    <div className="py-3 flex items-center justify-center">
                        <div className="bg-customPalette-white rounded-full border border-customPalette-orange mr-2">
                            <BadgeCheck className="h-7 w-7 text-customPalette-orange"/>
                        </div>
                        <span className="text-sm text-customPalette-black w-full">Ya fuiste a esta actividad!!!</span>
                    </div>
                    <div className="py-3 flex items-center justify-center">
                        <div className="bg-customPalette-white rounded-full border border-customPalette-red mr-2">
                            <BadgeX className="h-7 w-7 text-customPalette-red"/>
                        </div>
                        <span className="text-sm text-customPalette-black w-full">La actividad esta cancelada</span>
                    </div>
                </>
            }
            <div className="py-3 flex items-center justify-center">
                <div className="bg-customPalette-white rounded-full border border-customPalette-green mr-2">
                    <BadgeMinus className="h-7 w-7 text-customPalette-green"/>
                </div>
                <span className="text-sm text-customPalette-black w-full">La actividad tiene al menos 4 participantes y esta confirmada </span>
            </div>
            <div className="py-3 flex items-center justify-center">
                <div className="bg-customPalette-white rounded-full border border-customPalette-graydark mr-2">
                    <BadgeHelp className="h-7 w-7 text-customPalette-graydark"/>
                </div>
                <span className="text-sm text-customPalette-black w-full">La actividad tiene menos de 4 integrantes y aun no esta confirmada</span>
            </div>
        </div>
    );
}

export default ModalInsingStatus;