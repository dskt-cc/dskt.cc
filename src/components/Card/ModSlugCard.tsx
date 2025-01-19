import { TbMelon } from "react-icons/tb";
import { BiPackage, BiSolidPackage } from "react-icons/bi";
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ModSlugCardProps {
    title: string;
    value: string | string[];
    icon?: React.ReactNode;
    isAuthor?: boolean;
}

export const ModSlugCard = ({ title, value, icon, isAuthor }: ModSlugCardProps) => {
    const [authorImage, setAuthorImage] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthor && typeof value === 'string') {
            fetch(`https://api.github.com/users/${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data.avatar_url) {
                        setAuthorImage(data.avatar_url);
                    }
                })
                .catch(error => console.error('Error fetching GitHub profile:', error));
        }
    }, [isAuthor, value]);

    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'MelonLoader':
                return <TbMelon className="text-green-400" size={20} />;
            case 'BepInEx':
                return <BiPackage className="text-purple-400" size={20} />;
            case 'Both':
                return <BiSolidPackage className="text-blue-400" size={20} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3">
            {isAuthor && authorImage ? (
                <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                        src={authorImage}
                        alt={typeof value === 'string' ? value : title}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
            ) : title === "Type" ? (
                getTypeIcon(value as string)
            ) : (
                icon && <div className="text-gray-400">{icon}</div>
            )}
            <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-400 mb-1">
                    {title}
                </div>
                <div className="font-medium text-white truncate">
                    {Array.isArray(value) ? value.join(', ') : value}
                </div>
            </div>
        </div>
    );
};
