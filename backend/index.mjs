import express from "express";
import cors from "cors"
// initialize the app
const app = express()
import OpenAI from 'openai';
import { WebSocketServer } from "ws";

app.use(express.json())
app.use(cors())
const wss = new WebSocketServer({ port: 8005 });
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: `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`, // Store in .env file
});
async function main(message, ws, MODEL_NAME = "deepseek/deepseek-r1-distill-llama-8b") {
    console.log("MODEL NAME: ", MODEL_NAME);

    const completion = await openai.chat.completions.create({
        model: MODEL_NAME,
        stream: true,
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    });
    let fullChunks = ""
    for await (const chunk of completion) {
        const aiResponse = chunk.choices[0]?.delta?.content || "";
        console.log("AI Res: ", aiResponse);
        ws.send(aiResponse)
        fullChunks += aiResponse
    }
    return fullChunks
}



// routes
app.get("/", (req, res) => {
    res.send("HELLO world from backend")
})




wss.on("connection", async (ws) => {
    console.log("🔗 WebSocket client connected");
    ws.on("message", async (message) => {
        // MODEL_NAME
        try {
            const parsedMessage = JSON.parse(message); // Parse the incoming message
            let model = ""
            if (parsedMessage.model === "V3" ? model = "deepseek/deepseek-r1-distill-llama-8b" : model = "deepseek/deepseek-r1-distill-qwen-32b")
                console.log("message received", parsedMessage);
            await main(parsedMessage.msg, ws)
            // const response = await main(parsedMessage.msg, model)
            // ws.send(response)
        } catch (error) {
            console.error("🚨 Error processing response:", error);
        }
    });

    ws.on("close", () => {
        console.log(`❌ Client disconnected.`);
    });

});



const PORT = 5000
app.listen(PORT, () => {
    console.log(`server is running on: http://localhost:${PORT}`);
})