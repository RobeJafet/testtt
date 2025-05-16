'use client'

import Image from "next/image";
import { blurHashToDataURL } from "@/libs/blurhashDataURL";
import { urlFor } from "@/sanity/lib/image";


interface ImageWithBlurProps {
    image: Sanity.Image;
    sizes?: string;
    optionalAlt: string;
}

export default function ImageWithBlur({ ...props  }: ImageWithBlurProps ) {
    const { image, sizes, optionalAlt } = props;

    const width = image.asset.metadata.dimensions.width;
    const height = image.asset.metadata.dimensions.height;
    const blurhash = image.asset.metadata.blurHash;
    const base64Image = blurHashToDataURL(blurhash);

    return (
        <picture className="relative w-full bg-cover bg-black bg-no-repeat block" style={{ aspectRatio: width / height, backgroundImage: `url(${base64Image})` }}>
            <Image
            src={urlFor(image).url()}
            width={width}
            height={height}
            sizes={sizes}
            alt={image.alt || optionalAlt}
            className="w-full h-auto opacity-0"
            quality={100}
            onLoad={(e) => {
                e.currentTarget.classList.remove("opacity-0");
            }}
            />
        </picture>
        
    );
}