const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Endpoint to subscribe to a topic
app.post("/subscribe", async (req, res) => {
    try {
        const token = req.body.token;
        const topic = req.body.channel;
        await admin.messaging().subscribeToTopic(token, topic);
        res.status(200).send(`Subscribed to topic: ${topic}`);
  } catch (error) {
    console.error("Error subscribing to topic:", error);
    res.status(500).send("Failed to subscribe to topic.");
  }
});

// Endpoint to unsubscribe from a topic
app.post("/unsubscribe", async (req, res) => {
    try {
        const token = req.body.token;
        const topic = req.body.channel;
        await admin.messaging().unsubscribeFromTopic(token, topic);
        res.status(200).send(`Unsubscribed from topic: ${topic}`);
  } catch (error) {
    console.error("Error unsubscribing from topic:", error);
    res.status(500).send("Failed to unsubscribe from topic.");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
