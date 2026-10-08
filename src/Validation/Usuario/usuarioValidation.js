
import * as DBUsers from '../../Repository/Usuario/usuariosRepository.js';

export async function validarCadastro(user) {
    if (!user?.email)
        throw new Error("Insira um email");

    if (!user?.senha)
        throw new Error("Crie uma senha");

    if (!user?.nome?.trim())
        throw new Error("Insira um nome");

    if (!user?.email?.includes("@") ||
        !user?.email?.includes("."))
        throw new Error("Email inválido");

    const conta = await DBUsers.getEmail(user.email);

    if (conta != null)
        throw new Error("Usuário já cadastrado");
}

export function validarLogin(user, senhaCorreta) {
    if (!user?.conta || !user?.senha)
        throw new Error("Email ou senha incorretos");

    if (!senhaCorreta)
        throw new Error("Email ou senha incorretos");
}

export function validarEmailExistente(conta) {
    if (!conta)
        throw new Error("Usuário inexistente");
}