export default async function sitemap() {
    const baseUrl = "https://frantic-blog.vercel.app"; // ✅ your live domain

    // ✅ Fetch dynamic URLs
    const postsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post`,
        { cache: "no-store" }
    );

    const categoryRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        { cache: "no-store" }
    );

    const postsData = await postsRes.json();
    const categoriesData = await categoryRes.json();

    const posts = postsData?.data || [];
    const categories = categoriesData?.data || [];

    // ✅ Static pages
    const staticRoutes = [
        "",
        "/blogs",
        "/about",
        "/contact",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
    }));

    // ✅ Posts dynamic routes
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blogs/${post?.slug}`,
        lastModified: post?.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    // ✅ Category dynamic routes
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/category/${cat?.slug}`,
        lastModified: cat?.updatedAt ? new Date(cat.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}
