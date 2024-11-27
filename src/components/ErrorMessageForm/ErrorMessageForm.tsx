export function ErrorMessageForm({formik,input}:{formik:any;input:string}){
    return(
        <div className="text-sm text-customPalette-red h-0.5 mt-1 mb-10">
            {formik.touched[input] && formik.errors[input] && (
                <>{formik.errors[input]}</>
            )}
        </div>
    )
}

export default ErrorMessageForm;