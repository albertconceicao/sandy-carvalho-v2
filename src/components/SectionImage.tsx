import Image from "next/image";
import type { ContentImage } from "@/content/types";

type SectionImageProps = {
  image: ContentImage;
  className?: string;
  priority?: boolean;
};

export function SectionImage({ image, className, priority = false }: SectionImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      className={className}
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );
}
