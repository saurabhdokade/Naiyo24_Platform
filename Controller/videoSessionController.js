const VideoSession = require('../Model/videoSessionModel');

// Start a video session
exports.startVideoSession = async (req, res) => {
    try {
        const { interviewId, sessionId } = req.body;

        const videoSession = new VideoSession({
            interviewId,
            sessionId,
            candidate: req.user.id,
            status: 'active',
        });

        await videoSession.save();
        res.status(201).json({ message: "Video session started", videoSession });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// End a video session
exports.endVideoSession = async (req, res) => {
    try {
        const videoSession = await VideoSession.findByIdAndUpdate(
            req.params.id,
            { status: 'completed' },
            { new: true }
        );

        if (!videoSession) {
            return res.status(404).json({ message: "Video session not found" });
        }

        res.status(200).json({ message: "Video session ended", videoSession });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
