const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database");

const JWT_SECRET = "chaveSecretaSuperSegura"; // ideal: use variável de ambiente

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const connection = await mysql.createConnection(databaseConfig);
      const [rows] = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
      await connection.end();

      if (rows.length === 0) {
          return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "8h" });

      res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = { login };
