import bcrypt from "bcrypt"

import * as DBUsers from '../../Repository/Usuario/usuariosRepository.js'
import * as validacao from '../../Validation/Usuario/usuarioValidation.js';

export async function cadastrarUsuarioService(user){
    validacao.validarEmail(user.email);
    await validacao.getEmailValidation(user.email);

    user.nome = user.nome.split(" ")[0];
    user.senha = await bcrypt.hash(user.senha, 10);

    const response = await DBUsers.cadastrarUsuario(user);

    return response;
}

export async function entrarUsuarioService(user){
    const conta = await DBUsers.getEmail(user.email);

    const senhaCorreta = await bcrypt.compare(
        user.senha,
        conta.senha
    )

    validacao.validarLogin(conta, senhaCorreta);

    return conta;
}