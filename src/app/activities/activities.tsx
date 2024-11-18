import Link from "next/link";


export function Activities(){
    return(
        <>
        <Link 
            href="/activities/create-activity"
        >
            Crear actividad
        </Link>
        </>
    )
}
export default Activities;