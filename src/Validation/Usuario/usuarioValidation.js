import * as DBUsers from '../../Repository/Usuario/usuariosRepository.js'

export function validarEmail(email){
    if(!email.includes("@") || !email.includes("."))
        throw new Error("Email inválido")
}

export async function getEmailValidation(email){
    const user = await DBUsers.getEmail(email);

    if (user != null)
        throw new Error("Usuário já cadastrado")
}

export async function validacaoEmail(email){
    const user = await DBUsers.getEmail(email);

    if (user != null)
        throw new Error("Usuário já cadastrado")
}