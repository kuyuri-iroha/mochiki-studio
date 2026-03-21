"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageAsset } from "@/lib/microcms";

type Props = {
  images: ImageAsset[];
};

export default function HeroSlideshow({ images }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={image.url}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <Image
            src={image.url}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
