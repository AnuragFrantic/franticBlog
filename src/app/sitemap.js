export default async function sitemap() {

    const baseUrl = "https://frantic.in";
    // const baseUrl = "http://localhost:3000";

    try {

        // ================= FETCH DATA =================

        const postsRes = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
        const categoryRes = await fetch(`${baseUrl}/api/categories`, { cache: "no-store" });
        const policyRes = await fetch(`${baseUrl}/api/policy`, { cache: "no-store" });

        const postsJson = await postsRes.json();
        const categoryJson = await categoryRes.json();
        const policyJson = await policyRes.json();

        const posts = postsJson?.posts || postsJson?.data || [];
        const categories = categoryJson?.data || [];
        const policies = policyJson?.policies || [];

        // ================= STATIC ROUTES =================

        const staticRoutes = [
            "/",
            "/about",
            "/contact",
            // "/blogs",
        ].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        }));

        // ================= BLOG ROUTES =================

        const postRoutes = posts.map((post) => ({
            url: `${baseUrl}/blogs/${post.slug}`,
            lastModified: post.updatedAt
                ? new Date(post.updatedAt)
                : new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }));

        // ================= CATEGORY ROUTES =================

        const categoryRoutes = categories.map((cat) => ({
            url: `${baseUrl}/category/${cat.slug}`,
            lastModified: cat.updatedAt
                ? new Date(cat.updatedAt)
                : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }));

        // ================= POLICY ROUTES =================

        const policyRoutes = policies.map((p) => ({
            url: `${baseUrl}/policy/${p.slug}`,
            lastModified: p.updatedAt
                ? new Date(p.updatedAt)
                : new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        }));

        return [
            ...staticRoutes,
            ...postRoutes,
            ...categoryRoutes,
            ...policyRoutes,
        ];

    } catch (error) {

        console.error("Sitemap Error:", error);

        // fallback so sitemap always works
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
            },
        ];
    }
}
