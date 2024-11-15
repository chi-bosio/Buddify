import Image from "next/image";


export default function Logo() {
  return (
    <Image 
        src='/assets/logobuddify.png'
        alt="Logo buddify"
        width={400}
        height={200}
    />
  );
}
