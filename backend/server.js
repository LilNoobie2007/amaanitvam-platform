import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", true);

app.use(cors());

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/webhook", webhookRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/health", (req, res) => {
    res.json({ success: true, message: "OK" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});