const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { dbUser, dbPassword, port } = require("./config/env");
const errorHandler = require("./middlewares/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Cria uma instância do Express
const app = express();

// Configura o CORS
app.use(cors({
    origin: true, // Permite todas as origens
    credentials: true, // Permite credenciais
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // Cache das preflight requests por 24 horas
}));

// Middleware para lidar com OPTIONS requests
app.options('*', cors());

// Configura o express para entender req. em Json
app.use(express.json());

// Rota aberta
app.get("/api", (requisicao, resposta) => {
    resposta.status(200).send({ msg: "Bem vindo a API!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.cp2pd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        console.log("Conectado ao MongoDB");

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao MongoDB", err);
        process.exit(1);
    });
