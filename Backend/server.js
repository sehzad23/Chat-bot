require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai-serive");
const cors = require("cors");


const httpServer = createServer(app);

const allowedOrigins = [
  process.env.CLIENT_URL,];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: allowedOrigins }));

const chatHistory = [
  {
    role: "system",
    parts: [
      {
        text: "You are a helpful AI assistant. Answer the user clearly, make sure give answer in short and concise manner. if questhin is in Hinglish answer in Hinglish, if question is in English answer in English.",
      }
    ]
  }
];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ai-message", async (data) => {
    console.log("Message Recived", data);

    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });

    const airesponse = await generateResponse(chatHistory);
    console.log(airesponse);

    chatHistory.push({
      role: "model",
      parts: [{ text: airesponse }],
    });
    socket.emit("ai-response", airesponse);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
