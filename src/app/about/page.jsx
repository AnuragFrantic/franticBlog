import Link from "next/link";
import {
    ArrowRight,
    Smartphone,
    Code,
    Users,
    Zap,
    Award,
    Globe,
    Palette,
} from "lucide-react";

export const metadata = {
    title: "About Frantic Infotech - Leading App Development Company",
    description:
        "India's trusted mobile app development company since 2016. Delivering innovative, scalable solutions from Noida.",
};

export default function AboutPage() {
    return (
        <section className="min-h-screen py-20 px-4 bg-background text-foreground">
            <div className="relative max-w-6xl mx-auto">

                {/* ================= HERO ================= */}
                <div className="
          text-center mb-24 rounded-3xl p-12 shadow-2xl backdrop-blur-xl
          bg-white dark:bg-white/5
          border border-border
        ">
                    <h1 className="
            text-5xl md:text-7xl font-black mb-6 leading-tight
            bg-gradient-to-r
            from-foreground to-muted-foreground
            dark:from-white dark:to-gray-300
            bg-clip-text text-transparent
          ">
                        About Frantic Infotech
                    </h1>

                    <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
                        India's leading mobile app development company based in Noida.
                        Established in 2016, delivering innovative & scalable digital solutions globally.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 mb-24 items-start">

                    {/* ================= LEFT ================= */}
                    <div className="space-y-16">

                        {/* Since 2016 */}
                        <SectionBlock
                            icon={Award}
                            title="Since 2016"
                            gradient="from-blue-500 to-indigo-600"
                        >
                            <p>
                                Frantic Infotech is <strong>India's most trusted</strong> mobile app
                                development company headquartered in Noida, Uttar Pradesh.
                            </p>
                            <p>
                                We build <strong className="text-blue-500">advanced web apps</strong> and{" "}
                                <strong className="text-emerald-500">native mobile solutions</strong> —
                                from startups to enterprise platforms.
                            </p>
                        </SectionBlock>

                        {/* Expertise */}
                        <SectionBlock
                            icon={Code}
                            title="Our Expertise"
                            gradient="from-emerald-500 to-teal-600"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <ExpertiseCard
                                    icon={Smartphone}
                                    title="Mobile Apps"
                                    desc="iOS, Android, React Native, Flutter"
                                />
                                <ExpertiseCard
                                    icon={Globe}
                                    title="Web Development"
                                    desc="React, Next.js, Node.js, Full-stack"
                                />
                                <ExpertiseCard
                                    icon={Palette}
                                    title="UI/UX Design"
                                    desc="Modern, responsive, conversion-focused"
                                />
                                <ExpertiseCard
                                    icon={Zap}
                                    title="Digital Marketing"
                                    desc="SEO, content, growth strategy"
                                />
                            </div>
                        </SectionBlock>
                    </div>

                    {/* ================= RIGHT ================= */}
                    <div className="space-y-12 lg:sticky lg:top-24">

                        {/* Stats */}
                        <div className="
              rounded-3xl p-10 shadow-2xl
              bg-white dark:bg-white/5
              border border-border
            ">
                            <h3 className="
                text-2xl font-black mb-10 text-center
                bg-gradient-to-r
                from-foreground to-muted-foreground
                dark:from-white dark:to-blue-300
                bg-clip-text text-transparent
              ">
                                By The Numbers
                            </h3>

                            <div className="grid grid-cols-2 gap-8">
                                <StatCard number="8+" label="Years Experience" icon={Award} />
                                <StatCard number="500+" label="Projects Delivered" icon={Code} />
                                <StatCard number="50+" label="Expert Team" icon={Users} />
                            </div>
                        </div>

                        {/* Global */}
                        <div className="
              rounded-3xl p-8 text-center shadow-xl
              bg-secondary
              border border-border
            ">
                            <h4 className="font-bold text-xl mb-4">Global Delivery</h4>
                            <p className="text-muted-foreground mb-6">
                                Serving clients worldwide from our Noida headquarters
                            </p>
                            <div className="flex justify-center gap-4 text-sm font-semibold">
                                <span>🇮🇳 Noida, India</span>
                                <span>•</span>
                                <span>🌍 Global Clients</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= CTA ================= */}
                <div className="
          rounded-4xl p-16 text-center shadow-2xl
          bg-secondary
          border border-border
        ">
                    <h3 className="
            text-4xl font-black mb-6
            bg-gradient-to-r
            from-foreground to-muted-foreground
            dark:from-white dark:to-blue-200
            bg-clip-text text-transparent
          ">
                        Ready For Your Next Project?
                    </h3>

                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Partner with India’s leading app development experts.
                        Let’s build something extraordinary together.
                    </p>

                    <Link
                        href="/contact"
                        className="
              inline-flex items-center gap-3 px-12 py-6 rounded-3xl
              bg-primary text-primary-foreground
              font-bold shadow-xl hover:shadow-2xl transition
            "
                    >
                        Start Your Project
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ================= COMPONENTS ================= */

function SectionBlock({ icon: Icon, title, gradient, children }) {
    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-gradient-to-r ${gradient}`}
                >
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="
          text-4xl font-black
          bg-gradient-to-r
          from-foreground to-muted-foreground
          dark:from-white dark:to-gray-300
          bg-clip-text text-transparent
        ">
                    {title}
                </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground">
                {children}
            </div>
        </div>
    );
}

function ExpertiseCard({ icon: Icon, title, desc }) {
    return (
        <div className="
      rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-xl
      bg-white dark:bg-white/5
      border border-border
    ">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl">{title}</h4>
            </div>
            <p className="text-muted-foreground">{desc}</p>
        </div>
    );
}

function StatCard({ number, label, icon: Icon }) {
    return (
        <div className="text-center">
            <div className="
        w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center
        bg-secondary border border-border
      ">
                <Icon className="w-8 h-8" />
            </div>

            <div className="text-4xl font-black mb-3">{number}</div>
            <p className="text-muted-foreground font-medium">{label}</p>
        </div>
    );
}
