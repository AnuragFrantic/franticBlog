import Link from "next/link";
import Image from "next/image";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export default function FeaturedArticle({ blog, variant = "hero" }) {
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

  // ---------- TEXT ONLY ----------
  if (variant === "text-only") {
    return (
      <article>
        <Link href={href}>
          {category?.name && (
            <span className="text-xs uppercase text-gray-500">
              {category.name}
            </span>
          )}

          <h2 className="text-xl font-serif font-bold mt-2 hover:underline">
            {title}
          </h2>

          {metaDescription && (
            <p className="text-sm text-gray-700 mt-3 line-clamp-3">
              {metaDescription}
            </p>
          )}
        </Link>
      </article>
    );
  }

  // ---------- SECONDARY ----------
  if (variant === "secondary") {
    return (
      <article>
        <Link href={href}>
          {thumbnail && (
            <div className="relative aspect-[4/3] mb-4 rounded overflow-hidden">
              <Image
                src={IMAGE_BASE + thumbnail}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h3 className="font-serif font-semibold hover:underline">
            {title}
          </h3>
        </Link>
      </article>
    );
  }

  // ---------- HERO ----------
  return (
    <article>
      <Link href={href}>

        {/* ================= IMAGE ================= */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          {thumbnail && (
            <Image
              src={IMAGE_BASE + thumbnail}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          )}

          {/* Gradient + overlay ONLY on desktop */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Desktop title over image */}
          <div className="hidden sm:block absolute bottom-0 p-6">
            <h2 className="text-white text-2xl font-serif font-bold hover:underline underline-offset-4">
              {title}
            </h2>

            {metaDescription && (
              <p className="text-white/80 text-sm mt-2 line-clamp-2">
                {metaDescription}
              </p>
            )}
          </div>
        </div>

        {/* ================= MOBILE TITLE (below image) ================= */}
        <div className="sm:hidden mt-3">
          <h2 className="text-[18px] font-serif font-bold leading-snug hover:underline underline-offset-4">
            {title}
          </h2>

          {metaDescription && (
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
              {metaDescription}
            </p>
          )}
        </div>

      </Link>
    </article>
  );
}
