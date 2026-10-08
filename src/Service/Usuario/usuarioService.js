import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as DBUsers from '../../Repository/Usuario/usuariosRepository.js';
import * as validacao from '../../Validation/Usuario/usuarioValidation.js';

export async function cadastrarUsuarioService(user) {
    await validacao.validarCadastro(user);

    const partes = user.nome.trim().split(/\s+/);

    user.primeiro_nome = partes[0];
    user.nome = partes.join(" ");

    user.senha = await bcrypt.hash(user.senha, 10);

    const response = await DBUsers.cadastrarUsuario(user);

    return response;
}

export async function entrarUsuarioService(user) {
    validacao.validarLogin(user);

    const conta = await DBUsers.getEmail(user.email);

    if (!conta)
        throw new Error("Email ou senha incorretos");

    const senhaCorreta = await bcrypt.compare(
        user.senha,
        conta.senha
    );

    validacao.validarCredenciais(conta, senhaCorreta);

    const token = jwt.sign(
        {
            id: conta.id_usuario,
            cargo: conta.cargo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return {
        conta,
        token
    };
}

export async function atualizarCargoService(email) {
    const response = await DBUsers.atualizarCargo(email);

    return response;
}

export async function getUsuarioService(email) {
    const response = await DBUsers.getUsuario(email);

    return response;
}

export async function personalizarUsuarioService(user) {
    const response = await DBUsers.PersonalizarUsuario(user);

    return response;
}

export async function deleteUsuarioService(id) {
    const response = await DBUsers.deleteUsuario(id);

    return response;
}