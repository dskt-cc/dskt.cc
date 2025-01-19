import { TbMelon } from "react-icons/tb";
import { BiPackage, BiSolidPackage } from "react-icons/bi";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ModSlugCardProps {
  title: string;
  value: string | string[];
  icon?: React.ReactNode;
  isAuthor?: boolean;
}

export const ModSlugCard = ({
  title,
  value,
  icon,
  isAuthor,
}: ModSlugCardProps) => {
  const [authorImage, setAuthorImage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthor && typeof value === "string") {
      fetch(`https://api.github.com/users/${value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.avatar_url) {
            setAuthorImage(data.avatar_url);
          }
        })
        .catch((error) =>
          console.error("Error fetching GitHub profile:", error),
        );
    }
  }, [isAuthor, value]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "MelonLoader":
        return <TbMelon className="text-miku-aquamarine" size={20} />;
      case "BepInEx":
        return <BiPackage className="text-miku-pink" size={20} />;
      case "Both":
        return <BiSolidPackage className="text-miku-teal" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-miku-gray/50 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3 border border-miku-deep/20 hover:border-miku-deep/40 transition-colors duration-200">
      {isAuthor && authorImage ? (
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={authorImage}
            alt={typeof value === "string" ? value : title}
            fill
            className="object-cover rounded-md ring-2 ring-miku-teal/20 hover:ring-miku-teal/40 transition-all duration-200"
          />
        </div>
      ) : title === "Type" ? (
        getTypeIcon(value as string)
      ) : (
        icon && <div className="text-miku-light">{icon}</div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-miku-light mb-1 font-medium">{title}</div>
        <div className="font-medium text-miku-teal truncate hover:text-miku-waterleaf transition-colors duration-200">
          {Array.isArray(value) ? value.join(", ") : value}
        </div>
      </div>
    </div>
  );
};
