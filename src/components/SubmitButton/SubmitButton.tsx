export function SubmitButton({text}:{text:string}){
    return (
        <button
            type="submit"
            className="w-auto min-w-[150px] bg-customPalette-orange text-customPalette-white text-lg font-semibold py-3 px-8 rounded hover:bg-customPalette-orangebright mt-5 mb-5 mx-auto block"
          >
            {text}
          </button>
    )
}

export default SubmitButton;