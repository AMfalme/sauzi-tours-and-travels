import Image from "next/image";

function AppImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
export default AppImage;