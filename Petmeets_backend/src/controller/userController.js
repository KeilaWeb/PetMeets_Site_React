const userService = require('../service/user.js');
const { validationResult } = require('express-validator');

async function getAllUser(req, res) {
    try {
        const rows = await userService.getAllUser();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).send({
            message: "Erro ao obter usuário",
            body: error.message,
        });
    }
}

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, telefone, perfil, password } = req.body;
        await userService.createUser(name, email, telefone, perfil, password);
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).send({
            message: "Erro ao adicionar usuário!",
            error: error.message,
        });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, telefone, perfil, password } = req.body;
        await userService.updateUser(id, name, email, telefone, perfil, password);
        res.status(200).json("Success");
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao atualizar usuário',
            body: error.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).send({ message: "Deleted User!" });
    } catch (error) {
        res.status(500).send({
            message: "Erro ao deletar usuário!",
            error: error.message,
        });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: "Erro ao obter usuário por ID!",
            error: error.message,
        });
    }
}

module.exports = {
    getUserById,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
};
