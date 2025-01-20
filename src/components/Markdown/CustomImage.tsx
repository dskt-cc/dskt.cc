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
  {
    domain: "user-attachments",
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
    domain: "s3.amazonaws.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        unoptimized: true,
        className: "object-contain",
      },
    }),
  },
] as const;

const getImageConfig = (src: string) => {
  return IMAGE_CONFIGS.find((config) => src.includes(config.domain));
};

// @TODO: well, this works....
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
          // Handle GitHub user attachment URLs
          if (src.includes("user-attachments")) {
            try {
              const response = await fetch(src);
              const finalUrl = response.url;
              setImageData({
                src: finalUrl,
                props: {
                  fill: true,
                  unoptimized: true,
                  className: "object-contain",
                },
              });
              return;
            } catch {
              // If fetching fails, continue to regular config handling
            }
          }

          // Check if it's already an S3 URL
          if (src.includes("s3.amazonaws.com")) {
            setImageData({
              src,
              props: {
                fill: true,
                unoptimized: true,
                className: "object-contain",
              },
            });
            return;
          }

          const config = getImageConfig(src);
          if (config) {
            setImageData({ src, ...config.handler(src) });
            return;
          }
          setError(true);
          return;
        }

        // Handle relative paths
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

  if (props.fill) {
    return (
      <div className="relative w-full h-[400px] my-8 mb-12 clear-both">
        <Image
          key={finalSrc}
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

  return (
    <Image
      key={finalSrc}
      className="mb-8 clear-both"
      src={finalSrc}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export const WHITELISTED_DOMAINS = IMAGE_CONFIGS.map((config) => config.domain);
