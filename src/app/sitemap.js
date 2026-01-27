export default async function sitemap() {
    const baseUrl = "https://frantic.in";
    // const baseUrl = "http://localhost:3000";

    try {
        // ✅ correct endpoints
        const postsRes = await fetch(`${baseUrl}/api/posts`, {
            cache: "no-store",
        });

        const categoryRes = await fetch(`${baseUrl}/api/categories`, {
            cache: "no-store",
        });

        const postsJson = await postsRes.json();
        const categoryJson = await categoryRes.json();

        const posts = postsJson?.posts || postsJson?.data || [];
        const categories = categoryJson?.data || [];

        /* ---------- STATIC ROUTES ---------- */

        const staticRoutes = [
            "",
            "/blogs",
            // "/about",
            // "/contact",
        ].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        }));

        /* ---------- BLOG ROUTES ---------- */

        const postRoutes = posts.map((post) => ({
            url: `${baseUrl}/blogs/${post.slug}`,
            lastModified: post.updatedAt
                ? new Date(post.updatedAt)
                : new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }));

        /* ---------- CATEGORY ROUTES ---------- */

        const categoryRoutes = categories.map((cat) => ({
            url: `${baseUrl}/category/${cat.slug}`,
            lastModified: cat.updatedAt
                ? new Date(cat.updatedAt)
                : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        }));

        return [...staticRoutes, ...postRoutes, ...categoryRoutes];

    } catch (error) {
        console.error("Sitemap Error:", error);

        // fallback so sitemap always loads
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
            },
        ];
    }
}
