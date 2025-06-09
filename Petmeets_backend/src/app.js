const express = require("express");
const app = express();
const userRoutes = require("./router/userRoutes");
const clientRoutes = require('./router/clientPetRoutes');
const authRoutes = require("./router/authRoutes");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
