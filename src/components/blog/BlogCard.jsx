import Link from "next/link";
import Image from "next/image";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export default function BlogCard({ blog, variant = "horizontal" }) {
    if (!blog) return null;

    const {
        _id,
        slug,
        title,
        metaDescription,
        thumbnail,
        category,
    } = blog;

    const href = `/blogs/${slug || _id}`;

    // ---------- MINIMAL ----------
    if (variant === "minimal") {
        return (
            <article className="py-4 border-b border-gray-200 last:border-b-0">
                <Link href={href}>
                    <h3 className="text-sm font-serif font-semibold leading-snug hover:underline underline-offset-4">
                        {title}
                    </h3>
                </Link>
            </article>
        );
    }

    // ---------- COMPACT ----------
    if (variant === "compact") {
        return (
            <article>
                <Link href={href} className="flex gap-4">
                    {thumbnail && (
                        <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden">
                            <Image
                                src={IMAGE_BASE + thumbnail}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-serif font-semibold leading-snug hover:underline line-clamp-3">
                            {title}
                        </h3>
                    </div>
                </Link>
            </article>
        );
    }

    // ---------- HORIZONTAL (DEFAULT) ----------
    return (
        <article>
            <Link href={href} className="flex gap-5">
                <div className="flex-1">
                    {category?.name && (
                        <span className="text-xs uppercase text-gray-500">
                            {category.name}
                        </span>
                    )}

                    <h3 className="mt-1 font-serif font-semibold hover:underline line-clamp-2">
                        {title}
                    </h3>

                    {metaDescription && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                            {metaDescription}
                        </p>
                    )}
                </div>

                {thumbnail && (
                    <div className="relative w-32 h-24 shrink-0 rounded overflow-hidden">
                        <Image
                            src={IMAGE_BASE + thumbnail}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </Link>
        </article>
    );
}
