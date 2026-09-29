import Notification from '../models/Notification.js';

export async function list(req, res) {
    res.json({
        success: true,
        data: await Notification
            .find({ user: req.user._id })
            .sort('-createdAt')
            .limit(50)
    });
}

export async function read(req, res) {
    await Notification.updateOne(
        {
            _id: req.params.id,
            user: req.user._id
        },
        {
            $set: { isRead: true }
        }
    );

    res.json({ success: true });
}