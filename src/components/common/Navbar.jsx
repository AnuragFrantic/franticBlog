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
import logo from "@/app/assets/logo.svg";

export default function Navbar() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date();

        const formattedDate = today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        setDate(formattedDate);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={140}
                        height={40}
                        priority
                        className="bg-white p-2 rounded-md"
                    />
                </Link>

                {/* Date */}
                <span className="text-sm text-slate-600 font-medium">
                    {date}
                </span>

            </div>
        </header>
    );
}
