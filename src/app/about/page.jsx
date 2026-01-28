import Link from "next/link";
import { ArrowRight, Smartphone, Code, Users, Zap, Award, Globe, Palette } from "lucide-react";

export const metadata = {
    title: "About Frantic Infotech - Leading App Development Company",
    description: "India's trusted mobile app development company since 2016. Delivering innovative, scalable solutions from Noida.",
};

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-[#050914] py-20 px-4 overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[120px] animate-pulse" />
                <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse delay-700" />
                <div className="absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px] animate-pulse delay-1400" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-24 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
                        About Frantic Infotech
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        India's leading mobile app development company based in Noida.
                        Established in 2016, delivering innovative & scalable digital solutions globally.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 mb-24 items-start">
                    {/* Company Story */}
                    <div className="space-y-12">
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Since 2016
                                </h2>
                            </div>
                            <div className="text-gray-300 leading-relaxed text-lg space-y-6">
                                <p>
                                    Frantic Infotech is <span className="font-bold text-white">India's most trusted</span> mobile app development company
                                    headquartered in Noida, Uttar Pradesh. Over 8+ years, we've grown into a full-stack digital powerhouse.
                                </p>
                                <p>
                                    We specialize in <span className="font-bold text-blue-400">advanced web applications</span> and
                                    <span className="font-bold text-emerald-400">native mobile apps</span>, successfully fulfilling requirements
                                    from small projects to enterprise-scale solutions.
                                </p>
                            </div>
                        </div>

                        {/* Expertise */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Code className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Our Expertise
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { icon: Smartphone, title: "Mobile Apps", desc: "iOS, Android, React Native, Flutter" },
                                    { icon: Globe, title: "Web Development", desc: "React, Next.js, Node.js, Full-stack" },
                                    { icon: Palette, title: "UI/UX Design", desc: "Responsive, Modern, Conversion-focused" },
                                    { icon: Zap, title: "Digital Marketing", desc: "SEO, Content, Social Media" },
                                ].map(({ icon: Icon, title, desc }, i) => (
                                    <ExpertiseCard key={i} Icon={Icon} title={title} desc={desc} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats & Highlights */}
                    <div className="space-y-12 lg:sticky lg:top-24">
                        {/* Key Stats */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                            <h3 className="text-2xl font-black text-white mb-8 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent text-center">
                                By The Numbers
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <StatCard number="8+" label="Years Experience" icon={Award} />
                                <StatCard number="500+" label="Projects Delivered" icon={Code} />
                                <StatCard number="50+" label="Expert Team" icon={Users} />
                                {/* <StatCard number="100%" label="Client Satisfaction" icon={Star} /> */}
                            </div>
                        </div>

                        {/* Global Presence */}
                        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl text-center">
                            <h4 className="font-bold text-xl text-white mb-4">Global Delivery</h4>
                            <p className="text-gray-300 mb-6">Serving clients worldwide from our Noida headquarters</p>
                            <div className="flex items-center justify-center gap-6 text-sm text-blue-400 font-semibold">
                                <span>🇮🇳 Noida, India</span>
                                <span>•</span>
                                <span>🌍 Global Clients</span>
                            </div>
                        </div>
                    </div>
                </div>



                {/* CTA Section */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-4xl p-16 text-center shadow-2xl">
                    <h3 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Ready For Your Next Project?
                    </h3>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Partner with India's leading app development experts. Let's build something extraordinary together.
                    </p>
                    {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/contact" className="group flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-3xl shadow-2xl hover:shadow-white/50 hover:-translate-y-2 transition-all duration-500 min-w-[240px] justify-center">
                            Start Your Project
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link href="/services" className="px-12 py-6 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-3xl hover:bg-white/30 hover:shadow-xl transition-all duration-300">
                            View Our Services →
                        </Link>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

// Components
function ExpertiseCard({ Icon, title, desc }) {
    return (
        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white text-xl">{title}</h4>
            </div>
            <p className="text-gray-300">{desc}</p>
        </div>
    );
}

function StatCard({ number, label, icon: Icon }) {
    return (
        <div className="group text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-white/30 rounded-2xl backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="font-black text-4xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                {number}
            </div>
            <p className="text-gray-400 font-medium">{label}</p>
        </div>
    );
}
