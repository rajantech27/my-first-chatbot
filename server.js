
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript"
};

const server = http.createServer(async (req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);

    // Handle chatbot API
    if (url.pathname === "/api/chat") {

        const { default: chatHandler } = await import("./api/chat.js");

        const bodyChunks = [];

        for await (const chunk of req) {
            bodyChunks.push(chunk);
        }

        req.body = Buffer.concat(bodyChunks).toString();

        const response = {
            status(code) {
                res.statusCode = code;
                return this;
            },

            setHeader(name, value) {
                res.setHeader(name, value);
            },

            json(data) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
            }
        };

        try {
            await chatHandler(req, response);
        } catch (error) {
            console.error(error);

            if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    error: "Internal server error."
                }));
            }
        }

        return;
    }

    // Serve frontend files
    let requestedPath = decodeURIComponent(url.pathname);

    if (requestedPath === "/") {
        requestedPath = "/index.html";
    }

    const filePath = path.resolve(__dirname, "." + requestedPath);

    if (
        filePath !== __dirname &&
        !filePath.startsWith(__dirname + path.sep)
    ) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, content) => {

        if (error) {
            res.statusCode = 404;
            res.end("File not found");
            return;
        }

        const extension = path.extname(filePath);

        res.setHeader(
            "Content-Type",
            mimeTypes[extension] || "application/octet-stream"
        );

        res.end(content);

    });

});

server.listen(PORT, () => {
    console.log(`Chatbot running at http://localhost:${PORT}`);
});
