export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://frantic-blog.vercel.app/sitemap.xml",
    };
}
