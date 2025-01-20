"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

type ImageDomainConfig = {
  domain: string;
  handler: (src: string) => {
    src: string;
    props:
      | (Partial<React.ComponentProps<typeof Image>> & {
          width: number;
          height: number;
        })
      | {
          fill: true;
        };
  };
};

const IMAGE_CONFIGS: ImageDomainConfig[] = [
  {
    domain: "img.shields.io",
    handler: (src) => ({
      src,
      props: {
        width: 124,
        height: 28,
        className: "inline-block",
      },
    }),
  },
  {
    domain: "i.imgur.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        className: "object-contain",
      },
    }),
  },
  {
    domain: "private-user-images.githubusercontent.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        unoptimized: true,
        className: "object-contain",
      },
    }),
  },
  {
    domain: "avatars.githubusercontent.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        className: "object-contain",
      },
    }),
  },
  {
    domain: "raw.githubusercontent.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        className: "object-contain",
      },
    }),
  },
] as const;

const getImageConfig = (src: string) => {
  return IMAGE_CONFIGS.find((config) => src.includes(config.domain));
};

export const CustomImage = ({
  src,
  alt,
  repo,
}: {
  src: string;
  alt: string;
  repo: string;
}) => {
  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState<{
    src: string;
    props: Partial<React.ComponentProps<typeof Image>>;
  }>({
    src,
    props: {
      fill: true,
      className: "object-contain",
    },
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (src.startsWith("http")) {
          const config = getImageConfig(src);
          if (config) {
            setImageData({ src, ...config.handler(src) });
            return;
          }
          setError(true);
          return;
        }

        const branches = ["main", "master"];
        for (const branch of branches) {
          const rawUrl = `${repo.replace(
            "github.com",
            "raw.githubusercontent.com",
          )}/${branch}/${src}`;

          const response = await fetch(rawUrl);
          if (response.ok) {
            setImageData({
              src: rawUrl,
              props: {
                fill: true,
                priority: true,
                className: "object-contain",
              },
            });
            return;
          }
        }

        setError(true);
      } catch {
        setError(true);
      }
    };

    loadImage();
  }, [src, repo]);

  if (error) return null;

  const { src: finalSrc, props } = imageData;

  // For images that use fill property
  if (props.fill) {
    return (
      <div className="relative w-full h-[400px] my-4 mb-4">
        <Image
          src={finalSrc}
          alt={alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onError={() => setError(true)}
          {...props}
        />
      </div>
    );
  }

  // For images with explicit dimensions (like badges)
  return (
    <Image
      className="mb-4"
      src={finalSrc}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export const WHITELISTED_DOMAINS = IMAGE_CONFIGS.map((config) => config.domain);
