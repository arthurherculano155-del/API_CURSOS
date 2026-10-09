import "dotenv/config"
import express from "express";
import cors from "cors";

import Rotear from "./rotas.js";

const api = express();
api.use(express.json());
api.use(cors({
    origin: [
        "https://cursinhopertinho.onrender.com",
        "http://localhost:3000"
    ]
}));

Rotear(api)

const porta = process.env.PORT || 5600

api.listen(porta, "0.0.0.0", () => console.log(`API rodando na porta ${porta}`));