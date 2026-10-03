import { con } from './connection.js';

export async function cadastrarUsuario(user){
    const command = `
        INSERT INTO usuarios(nome, email, senha, cargo, primeiro_nome)
        values(?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [
        user.nome.trim(),
        user.email.trim().toLowerCase(),
        user.senha,
        user.cargo,
        user.primeiro_nome
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
        UPDATE usuarios
        SET cargo = IF(cargo = 'usuario', 'admin', 'usuario')
        WHERE email = ?
    `

    const [resposta] = await con.query(command, [email.trim().toLowerCase()])

    return resposta.affectedRows;
}

export async function getUsuario(email){
    const command = `
        select * from usuarios
        where email like ?
    `

    const [lista] = await con.query(command, `%${[email]}%`);

    return lista;
}