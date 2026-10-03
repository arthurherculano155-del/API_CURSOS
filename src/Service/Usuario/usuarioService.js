import bcrypt from "bcrypt"

import * as DBUsers from '../../Repository/Usuario/usuariosRepository.js'
import * as validacao from '../../Validation/Usuario/usuarioValidation.js';

export async function cadastrarUsuarioService(user){
    validacao.validarEmail(user.email);
    await validacao.getEmailValidation(user.email);

    const partes = user.nome.split(" ");

    user.primeiro_nome = partes[0];

    user.nome = `${partes[0]} ${partes[1]}`;

    user.senha = await bcrypt.hash(user.senha, 10);

    const response = await DBUsers.cadastrarUsuario(user);

    return response;
}

export async function entrarUsuarioService(user){
    const conta = await DBUsers.getEmail(user.email);

    validacao.validarLogin(conta)

    const senhaCorreta = await bcrypt.compare(
        user.senha,
        conta.senha
    )

    validacao.validarSenhaLogin(senhaCorreta);

    return conta;
}

export async function atualizarCargoService(email){
    const response = await DBUsers.atualizarCargo(email);

    return response;
}

export async function getUsuarioService(email){
    const response = await DBUsers.getUsuario(email);

    return response;
}