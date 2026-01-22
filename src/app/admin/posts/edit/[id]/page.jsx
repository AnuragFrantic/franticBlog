import BlogForm from "../../_components/CreateBlogForm";

export default async function EditBlogPage({ params }) {
    const { id } = await params;
    return <BlogForm id={id} />;
}
