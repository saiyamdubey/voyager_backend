import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js"; 

const port = 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

// Route to add a question-answer pair to the database
app.post("/api/chats", async (req, res) => {
  const { question, answer } = req.body;

  try {
    // Create a new chat document
    const newChat = new Chat({ question, answer });

    // Save the new chat to MongoDB
    const savedChat = await newChat.save();

    res.status(201).json(savedChat);
  } catch (err) {
    console.log("Error saving chat:", err);
    res.status(500).send("Error saving chat!");
  }
});

// Route to retrieve all question-answer pairs from the database
app.get("/api/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (err) {
    console.log("Error retrieving chats:", err);
    res.status(500).send("Error retrieving chats!");
  }
});

// Route to retrieve a specific chat by its ID
app.get("/api/chats/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.log("Error retrieving chat:", err);
    res.status(500).send("Error retrieving chat!");
  }
});


app.get("/gfgshobhit", async (req, res) => {
  try {
    const response = await axios.get("https://geeks-for-geeks-api.vercel.app/shobhit_singh_gfg");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server and connect to MongoDB
app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
