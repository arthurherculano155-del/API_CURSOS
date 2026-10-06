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
        select 
            id_usuario,
            nome,
            email,
            cargo,
            primeiro_nome,
            imagem_url
        from usuarios
        where email like ?
        order by cargo DESC, 
        email ASC; 
    `

    const [lista] = await con.query(command, `%${[email]}%`);

    return lista;
}

export async function PersonalizarUsuario(user){
    const command = `
        UPDATE usuarios
        set imagem_url = ?,
        primeiro_nome = ?
        where email = ?
    `

    const [resposta] = await con.query(command, [
        user.imagem_url,
        user.primeiro_nome,
        user.email
    ])

    return resposta.affectedRows;
}

export async function deleteUsuario(id){
    const command = `
        delete usuarios
        where id = ?
    `

    const [resposta] = await con.query(command, [id]);

    return resposta.affectedRows;
}