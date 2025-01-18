'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbCube, TbHome, TbBrandGithub, TbBook } from 'react-icons/tb';

export const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        {
            name: 'Home',
            path: '/',
            icon: <TbHome className="text-xl" />,
        },
        {
            name: 'Mods',
            path: '/mods',
            icon: <TbCube className="text-xl" />,
        },
        {
            name: 'Docs',
            path: '/docs',
            icon: <TbBook className="text-xl" />,
        }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50">
            <nav className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-purple-400">
                            dskt.cc
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative flex items-center gap-2 text-base ${
                                    pathname === item.path
                                        ? 'text-white bg-purple-500/20 px-4 py-2 rounded-lg'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <Link
                            href="https://github.com/dskt-cc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-gray-200"
                        >
                            <TbBrandGithub className="text-xl" />
                            <span className="hidden sm:inline">GitHub</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};
