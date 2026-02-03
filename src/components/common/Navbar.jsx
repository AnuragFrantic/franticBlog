// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { CategoryService } from "@/services/category.service";
// import logo from "@/app/assets/logo.svg";

// export default function Navbar() {
//     const router = useRouter();
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const data = await CategoryService.getAll();

//                 // handle both API formats
//                 if (data?.data) setCategories(data.data);
//                 else setCategories(data);
//             } catch (error) {
//                 console.log("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleCategoryChange = (e) => {
//         const slug = e.target.value;
//         if (!slug) return;

//         router.push(`/blogs?category=${slug}`);
//     };

//     return (
//         <header className="w-full border-b bg-white sticky top-0 z-50">
//             <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
//                 {/* ✅ Logo */}
//                 <Link href="/" className="flex items-center justify-center gap-2">
//                     <Image src={logo} alt="Logo" width={140} height={40} priority />
//                 </Link>


//             </div>
//         </header>
//     );

// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { CategoryService } from "@/services/category.service";
import logo from "@/app/assets/logo.svg";

export default function Navbar() {

    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAll();
                if (data?.data) setCategories(data.data);
                else setCategories(data);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    if (!mounted) return null;

    return (
        <header className="sticky top-0 z-50 w-full 
      bg-white dark:bg-slate-950 
      border-b border-slate-200 dark:border-slate-800">

            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">


                <Link href="/" className="flex w-full items-center justify-center gap-2">
                    <Image src={logo} alt="Logo" width={140} height={40} priority className="bg-white p-2 rounded-md" />
                </Link>

                {/* Theme Toggle */}
                {/* <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-lg
          bg-slate-100 dark:bg-slate-900
          text-slate-800 dark:text-slate-200
          hover:bg-slate-200 dark:hover:bg-slate-800
          transition"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button> */}

            </div>
        </header>
    );
}

