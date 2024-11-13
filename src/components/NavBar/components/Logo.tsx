import Image from "next/image";


export default function Logo() {
  return (
    <Image 
        src='/assets/logo.png'
        alt="Logo buddify"
        width={400}
        height={200}
    />
  );
}
