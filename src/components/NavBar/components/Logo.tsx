import Image from "next/image";


export default function Logo() {
  return (
    <Image 
        src='/assets/logobuddify.png'
        alt="Logo buddify"
        className="h-full w-full"
        width={400}
        height={200}
    />
  );
}
