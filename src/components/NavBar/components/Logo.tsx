import Image from "next/image";


export default function Logo() {
  return (
    <Image 
        src='/assets/logobuddify.png'
        alt="Logo buddify"
        className="h-full w-full"
        width={1000}
        height={1000}
    />
  );
}
