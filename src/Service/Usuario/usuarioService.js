import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { unlink } from 'node:fs/promises';
import { enviarFotoPerfil } from './cloudinaryService.js';

import * as DBUsers from '../../Repository/Usuario/usuariosRepository.js';
import * as validacao from '../../Validation/Usuario/usuarioValidation.js';

import { enviarCodigo } from "../emailService.js";

const codigos = new Map();

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
            cargo: conta.cargo,
            email: conta.email
        },
        process.env.JWT_SECRET
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

export async function enviarCodigoService(email) {
    validacao.validarEmailExistente(email);

    const usuario = await DBUsers.getEmail(email);

    validacao.validarEmailExistente(usuario);

    const codigo = crypto.randomInt(100000, 1000000).toString();

    const hash = await bcrypt.hash(codigo, 10);

    const anterior = codigos.get(usuario.id_usuario);

    if (anterior && Date.now() < anterior.validade)
        throw new Error("Já existe um código de recuperação válido");

    codigos.set(usuario.id_usuario, {
        hash: hash,
        validade: Date.now() + 600000,
        tentativas: 0
    });

    await enviarCodigo(usuario.email, codigo);
}

export async function verificarCodigoService(email, codigo) {
    if (typeof email !== "string" || !email.trim())
        throw new Error("E-mail inválido");

    email = email.trim().toLowerCase();

    const usuario = await DBUsers.getEmail(email);

    validacao.validarEmailExistente(usuario);

    const dados = codigos.get(usuario.id_usuario);

    validacao.dadosValidation(dados);

    dados.tentativas++;

    const codigoCorreto = await bcrypt.compare(
        String(codigo),
        dados.hash
    )

    validacao.verificarCodigo(codigoCorreto);

    codigos.delete(usuario.id_usuario);

    const token = jwt.sign(
        {
            id: usuario.id_usuario,
            finalidade: "recuperar-senha"
        },
        process.env.JWT_RECUPERACAO_SECRET,
        {
            expiresIn: "10m"
        }
    )

    return token;
}

export async function atualizarSenhaService(token, novaSenha) {
    const dados = jwt.verify(
        token,
        process.env.JWT_RECUPERACAO_SECRET
    )

    if (dados.finalidade != "recuperar-senha")
        throw new Error("Token inválido");

    const senhaCriptografada = await bcrypt.hash(
        novaSenha,
        10
    );

    const resposta = await DBUsers.RecuperarSenha(
        dados.id,
        senhaCriptografada
    );

    if (resposta === 0)
        throw new Error("Usuário não encontrado");

    return resposta;

}

export async function atualizarFotoPerfilService(id, caminhoArquivo) {
    try {
        const { imagem_url } = await enviarFotoPerfil(caminhoArquivo);

        const resposta = await DBUsers.atualizarFotoPerfil(
            id,
            imagem_url
        );
        
        return imagem_url;
    }
    finally {
        await unlink(caminhoArquivo).catch(() => {});
    }
}