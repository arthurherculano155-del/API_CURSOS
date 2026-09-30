import { con } from './connection.js';

export async function cadastrarUsuario(user){
    const command = `
        INSERT INTO usuarios(nome, email, senha, cargo)
    `
}