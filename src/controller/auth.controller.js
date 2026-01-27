import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );
};

// ---------------- REGISTER ADMIN ----------------
export async function registerAdmin(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
    });

    const token = generateToken(user);

    return { token, user };
}

// ---------------- LOGIN ADMIN ----------------
export const loginAdmin = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    if (user.password !== password) {
        throw new Error("Invalid credentials");
    }

    if (user.role !== "admin") {
        throw new Error("Access denied");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user,
    };
};

