const { SpamData } = require('../models/spamData');

const markAsSpam = async (req, res) => {
    const { phoneNumber, reporterId } = req.body;
    try {
        if(phoneNumber && reporterId) {
            await SpamData.create({ phoneNumber, reporterId });
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({message: 'Invalid Data'});
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to mark as spam.' });
    }
}

module.exports = { markAsSpam }
//check if req.body empty