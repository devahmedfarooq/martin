import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens
import User from "../../../db/models/user.model.js"; // Assuming you have a User model

// Register a new user
const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user in the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login an existing user
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                subscription: user.subscription,
                totalProduct: user.totalProduct,
                totalRegrenrations: user.totalRegenerations
            },
            process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ token, message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const authController = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
        res.status(200).json({ message: 'User Returned!', user })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        // Ensure `req.user` contains only the user ID
        const userId = req.user.id; // Make sure req.user.id is the correct field for the user's ID
        const user = await User.findById(userId); // Find the user by their ID

        if (!username || !email) {
            return res.status(403).json({ message: 'Please Send Both Email And Username!' });
        }
        if (!user) {
            return res.status(403).json({ message: 'No User Exists!' });
        }

        // If the password is provided, update the user with the new password and other data
        if (password) {
            await User.findByIdAndUpdate(userId, { ...req.body });
        }

        // Update user information without updating password if password is not provided
        const updatedUser = await User.findByIdAndUpdate(userId, {
            email,
            username,
        }, { new: true }); // Ensure we return the updated user with `{ new: true }`

        return res.status(200).json({ message: 'User Saved', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerController, loginController, authController, saveController };
