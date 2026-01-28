import Link from "next/link";
import Image from "next/image";
import { getAllPolicies } from "@/controller/PolicyController";
import logo from "@/app/assets/logo.svg";
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

export default async function Footer() {
    const policies = await getAllPolicies();

    return (
        <footer className="bg-black text-gray-300 ">
            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* TOP GRID */}
                <div className="grid gap-10 md:grid-cols-3">

                    {/* LOGO + ABOUT */}
                    <div>
                        <div className="flex items-center gap-2 bg-white shadow w-max p-3 rounded-md">
                            <Image
                                src={logo}   // put logo in public folder
                                alt="Logo"
                                width={100}
                                height={100}
                            />

                        </div>

                        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                            We provide reliable services with complete transparency.
                            Read our policies to understand how we work.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className="flex gap-4 mt-6">
                            <SocialIcon href="https://www.facebook.com/share/12GUacWKyRw/" icon={<Facebook />} />
                            <SocialIcon href="https://www.instagram.com/franticinfotech?igsh=MXJ6bXIwMHZheWdiaw==" icon={<Instagram />} />

                            <SocialIcon href="https://www.linkedin.com/company/frantic-infotech-pvt-ltd/" icon={<Linkedin />} />
                        </div>
                    </div>

                    {/* POLICIES */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-2">
                            <li >
                                <Link
                                    href={`/about`}
                                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                >
                                    About Us
                                </Link>
                            </li>
                            {policies.map((p) => (
                                <li key={p._id}>
                                    <Link
                                        href={`/policy/${p.slug}`}
                                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                    >
                                        {p.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Contact
                        </h3>

                        <ul className="space-y-4 text-sm">

                            {/* EMAIL */}
                            <li className="flex items-start gap-3 group">
                                <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                                <Link
                                    href="mailto:sales@franticpro.com"
                                    className="text-gray-400 group-hover:text-white transition"
                                >
                                    sales@franticpro.com
                                </Link>
                            </li>

                            {/* PHONE */}
                            <li className="flex items-start gap-3 group">
                                <Phone className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                                <Link
                                    href="tel:+918887998502"
                                    className="text-gray-400 group-hover:text-white transition"
                                >
                                    +91 8887998502
                                </Link>
                            </li>

                            {/* LOCATION INDIA */}
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                                <Link
                                    href="https://www.google.com/maps?q=2nd+Floor,+A100,+A+Block,+Sector+58,+Noida,+Uttar+Pradesh+201301"
                                    target="_blank"
                                    className="text-gray-400 group-hover:text-white transition leading-relaxed"
                                >
                                    2nd Floor, A100, A Block, Sector 58, Noida, Uttar Pradesh - 201301
                                </Link>
                            </li>

                            {/* LOCATION USA */}
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                                <Link
                                    href="https://www.google.com/maps?q=1964+Gardner+Cir+E,+Aurora,+IL+60503,+United+States"
                                    target="_blank"
                                    className="text-gray-400 group-hover:text-white transition leading-relaxed"
                                >
                                    1964 Gardner Cir E, Aurora, IL 60503, United States
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Frantic Infotech. All rights reserved.
                </div>

            </div>
        </footer>
    );
}

/* ======================
   SOCIAL ICON COMPONENT
====================== */
function SocialIcon({ href, icon }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="
        w-10 h-10 flex items-center justify-center
        rounded-full border border-white/20
        text-gray-400
        hover:text-white
        hover:bg-white/10
        hover:scale-110
        transition-all duration-200
      "
        >
            {icon}
        </Link>
    );
}



