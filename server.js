const express = require("express");
const cors = require("cors");
const { exec, execSync } = require("child_process");  // ✅ Add execSync here

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("public"));


app.post("/api/chat", (req, res) => {
    const userMessage = req.body.message;
    console.log("Received user message:", userMessage);

    try {
        console.log("Running command: ollama run deepseek-r1:8b", userMessage);
        const output = execSync(`ollama run deepseek-r1:8b "${userMessage}"`, { encoding: "utf-8" });
        console.log("Model Output:", output);
        res.json({ response: output.trim() });
    } catch (error) {
        console.error("Execution Error:", error);
        res.status(500).json({ response: "Error executing the model." });
    }
});
app.listen(5000, () => {
    console.log("Express server is running on http://localhost:5000");
});
