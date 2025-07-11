const axios = require('axios');

const handleFaceRecognition = async (req, res) => {
    try {
        const { image } = req.body;

        const response = await axios.post('http://localhost:5001/recognize', {
            image
        });

        // Ако има грешка от Flask, върни я към клиента
        if (response.data.identity === "Error") {
            res.status(500).json({ error: response.data.error, trace: response.data.trace });
            return;
        }

        const identity = response.data.identity || "Unknown";
        res.json({ identity });

    } catch (err){
        // Покажи цялата грешка, ако идва от Flask
        if (err.response && err.response.data && err.response.data.error) {
            console.error('Face recognition error:', err.response.data.error);
            console.error('Trace:', err.response.data.trace);
            res.status(500).json({ error: err.response.data.error, trace: err.response.data.trace });
        } else {
            console.error('Error processing face recognition:', err);
            res.status(500).json({ error: 'Failed to process face recognition' });
        }
    }
}
module.exports = { handleFaceRecognition };