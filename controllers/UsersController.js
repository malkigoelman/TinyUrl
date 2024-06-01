import User from "../models/User.js";

const UsersController = {
    getAll: async (req, res) => {
        try {
            const users = await User.find().populate('links');
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('links');
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    create: async (req, res) => {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default UsersController;