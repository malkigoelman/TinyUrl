import Link from "../models/link.js";

const LinksController = {
    getAll: async (req, res) => {
        try {
            const links = await Link.find();
            res.json(links);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if (!link) return res.status(404).json({ message: 'Link not found' });
            res.json(link);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    create: async (req, res) => {
        const { originalUrl } = req.body;
        const link = new Link({ originalUrl });
        try {
            const newLink = await link.save();
            res.status(201).json(newLink);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!link) return res.status(404).json({ message: 'Link not found' });
            res.json(link);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const link = await Link.findByIdAndDelete(req.params.id);
            if (!link) return res.status(404).json({ message: 'Link not found' });
            res.json({ message: 'Link deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    redirect: async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if (!link) return res.status(404).json({ message: 'Link not found' });

            const targetParamValue = req.query[link.targetParamName] || "";

            link.clicks.push({
                ipAddress: req.ip,
                targetParamValue: targetParamValue
            });
            await link.save();

            res.redirect(link.originalUrl);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getClickStats: async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if (!link) return res.status(404).json({ message: 'Link not found' });

            const stats = link.clicks.reduce((acc, click) => {
                const target = click.targetParamValue;
                if (!acc[target]) {
                    acc[target] = 0;
                }
                acc[target]++;
                return acc;
            }, {});

            res.json(stats);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default LinksController;