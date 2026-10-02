import { con } from './connection.js';

export async function cadastrarUsuario(user){
    const command = `
        INSERT INTO usuarios(nome, email, senha, cargo)
        values(?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [
        user.nome,
        user.email.trim().toLowerCase(),
        user.senha,
        user.cargo
    ])

    return resposta.insertId;
}

export async function getEmail(email){
    const command = `
        select * from usuarios
        where email = ?
    `

    const [resposta] = await con.query(command, [email.trim().toLowerCase()])

    return resposta[0];
}

export async function atualizarCargo(email){
    const command = `
        UPDATE from usuarios
        set cargo = "admin"
        where email = ?
    `

    const [resposta] = await con.query(command, [email])

    return resposta.insertId;
}

export async function getUsuario(email){
    const command = `
        select * from usuarios
        where email like ?
    `

    const [lista] = await con.query(command, `%${[email]}%`);

    return lista;
}