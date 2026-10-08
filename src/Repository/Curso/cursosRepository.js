import { con } from "../connection.js";

export async function postarCurso(curso){
    const command = `
        INSERT INTO ofertas_cursos(
            id_curso, 
            id_unidade, 
            nivel,
            preco,
            carga_horaria,
            modalidade,
            descricao,
            link_inscricao,
            imagem
        )
            values(?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [
            curso.id_curso, 
            curso.id_unidade, 
            curso.nivel, 
            curso.preco, 
            curso.carga_horaria, 
            curso.modalidade,
            curso.descricao,
            curso.link_inscricao,
            curso.imagem
    ]);

    return resposta.insertId;
}

export async function getRegioes(id_regiao){
    const command = `
        SELECT
            b.id_bairro,
            b.nome AS bairro,
            r.nome AS regiao
        FROM bairros b
        INNER JOIN regioes r
            ON b.id_regiao = r.id_regiao
        where r.id_regiao= ?
        ORDER BY bairro ASC;
    `

    const [lista] = await con.query(command, [id_regiao]);

    return lista;
}

export async function getCursos(){
    const command = `
        SELECT
            id_curso,
            nome,
            descricao
        FROM cursos
        ORDER BY nome;
    `
    const [lista] = await con.query(command);

    return lista;
}

export async function getUnidades(regiao){
    const command = `
        SELECT
            u.id_unidade,
            i.nome AS instituicao,
            u.nome AS unidade,
            u.endereco,
            u.numero,
            u.cep,
            b.nome AS bairro,
            r.nome AS regiao,
            u.latitude,
            u.longitude
        FROM unidades u
        INNER JOIN instituicoes i
            ON u.id_instituicao = i.id_instituicao
        INNER JOIN bairros b
            ON u.id_bairro = b.id_bairro
        INNER JOIN regioes r
            ON b.id_regiao = r.id_regiao
        where b.id_regiao = ?
        ORDER BY i.nome, u.nome;
    `

    const [lista] = await con.query(command, [regiao])

    return lista;
}

export async function getOfertas(regiao){
    const command = `
        SELECT
            o.id_oferta AS id,

            c.id_curso,
            c.nome AS curso,

            o.nivel,
            o.preco,
            o.carga_horaria,
            o.modalidade,
            o.descricao AS descricao,
            o.link_inscricao,
            o.imagem,

            i.id_instituicao,
            i.nome AS instituicao,

            u.id_unidade,
            u.nome AS unidade,
            u.endereco,
            u.numero,
            u.cep,

            b.id_bairro,
            b.nome AS bairro,

            r.id_regiao,
            r.nome AS regiao

        FROM ofertas_cursos AS o

        INNER JOIN cursos AS c
            ON o.id_curso = c.id_curso

        INNER JOIN unidades AS u
            ON o.id_unidade = u.id_unidade

        INNER JOIN instituicoes AS i
            ON u.id_instituicao = i.id_instituicao

        INNER JOIN bairros AS b
            ON u.id_bairro = b.id_bairro

        INNER JOIN regioes AS r
            ON b.id_regiao = r.id_regiao

        where r.nome like ?

        ORDER BY
            r.nome ASC,
            b.nome ASC,
            i.nome ASC,
            c.nome ASC;
    `

    const resposta = await con.query(command, [`%${regiao}%`]);

    return resposta;
}

export async function deleteOfertas(id){
    const command = `
        delete from ofertas_cursos
        where id_oferta = ?
    `

    const resposta = await con.query(command, [id]);

    return resposta;
}