import Category from "@/models/Category";

// Create Category
export async function createCategory(data) {
    const { name, slug, description, isActive, icon } = data;

    if (!name || !slug) {
        throw new Error("name and slug are required");
    }

    const exists = await Category.findOne({ slug });
    if (exists) {
        throw new Error("Category slug already exists");
    }

    const category = await Category.create({
        name,
        slug,
        description: description || "",
        isActive: isActive !== undefined ? isActive : true,
        icon: icon || "",
    });

    return category;
}

// Get All Categories
export async function getCategories() {
    return await Category.find({}).sort({ createdAt: -1 });
}

// Update Category
export async function updateCategory(id, data) {
    const category = await Category.findById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    category.name = data.name ?? category.name;
    category.slug = data.slug ?? category.slug;
    category.description = data.description ?? category.description;
    category.isActive = data.isActive ?? category.isActive;
    category.icon = data.icon ?? category.icon;

    await category.save();
    return category;
}

// Delete Category
export async function deleteCategory(id) {
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
        throw new Error("Category not found");
    }

    return true;
}
