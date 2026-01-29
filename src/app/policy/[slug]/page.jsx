import { notFound } from "next/navigation";
import { getPolicyBySlug } from "@/controller/PolicyController";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const policy = await getPolicyBySlug(slug);

    if (!policy) {
        return {
            title: "Policy Not Found",
        };
    }

    return {
        title: policy.title,
        description: policy.metaDescription || policy.title,
    };
}

export default async function PolicyPage({ params }) {
    const { slug } = await params;

    const policy = await getPolicyBySlug(slug);

    if (!policy) {
        notFound();
    }

    return (
        <section className="min-h-screen  bg-[#050914] py-16 px-4 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left */}
                <div
                    className="
      absolute
      -top-24 -left-24
      h-[260px] w-[260px]
      sm:-top-40 sm:-left-40
      sm:h-[520px] sm:w-[520px]
      rounded-full
      bg-blue-600/25
      blur-[100px] sm:blur-[120px]
    "
                />

                {/* Top Right */}
                <div
                    className="
      absolute
      -top-24 right-0
      h-[260px] w-[260px]
      sm:-top-40
      sm:h-[500px] sm:w-[500px]
      rounded-full
      bg-indigo-500/20
      blur-[100px] sm:blur-[120px]
    "
                />

                {/* Bottom Center */}
                <div
                    className="
      absolute
      bottom-0 left-1/2 -translate-x-1/2
      h-[200px] w-[360px]
      sm:h-[400px] sm:w-[900px]
      rounded-full
      bg-cyan-500/10
      blur-[110px] sm:blur-[130px]
    "
                />
            </div>


            <div className="relative max-w-5xl mx-auto">

                {/* Hero Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-8 leading-tight">
                        {policy.title}
                    </h1>

                </div>


                {/* Main Content */}
                <article className="bg-white wrap-break-word backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-12 prose prose-lg max-w-none prose-headings:font-black prose-headings:text-white prose-headings:bg-gradient-to-r prose-headings:from-white prose-headings:to-gray-200 prose-headings:bg-clip-text prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-p:text-gray-200 prose-li:text-gray-200 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/10">
                    <div dangerouslySetInnerHTML={{ __html: policy.content }} />
                </article>

                {/* Bottom CTA */}
                <div className="text-center mt-20 pt-16 border-t border-white/10">
                    <h3 className="text-2xl font-bold text-gray-200 mb-6">Explore More Insights</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={'/'} className="px-8 py-4 rounded-2xl w-full bg-blue-600 w-max hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl  transform hover:-translate-y-1 transition-all duration-300">
                            ← Latest Articles
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
}
