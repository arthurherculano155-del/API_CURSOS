import { con } from "../connection.js";

export async function getOfertaExistente(oferta) {
    const command = `
        SELECT *
        FROM ofertas_cursos
        WHERE id_curso = ?
        AND id_unidade = ?
        AND nivel = ?
        AND preco = ?
        AND carga_horaria = ?
        AND modalidade = ?
        LIMIT 1;
    `;

    const [resposta] = await con.query(command, [
        Number(oferta.id_curso),
        Number(oferta.id_unidade),
        oferta.nivel,
        Number(oferta.preco),
        Number(oferta.carga_horaria),
        oferta.modalidade
    ]);

    return resposta[0] ?? null;
}

export async function getOfertaExistentePorID(oferta) {
    const command = `
        SELECT *
        FROM ofertas_cursos
        WHERE id_curso = ?
        LIMIT 1;
    `;

    const [resposta] = await con.query(command, [
        Number(oferta)
    ]);

    return resposta[0];
}

export async function postarCurso(curso) {
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

export async function getRegioes(id_regiao) {
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

export async function getCursos() {
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

export async function getUnidades(regiao) {
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

export async function getOfertas(pesquisa = {}) {
    let command = `
        SELECT
            o.id_oferta AS id,

            c.id_curso,
            c.nome AS curso,

            o.nivel,
            o.preco,
            o.carga_horaria,
            o.modalidade,
            o.descricao,
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

        WHERE 1 = 1
    `;

    const valores = [];

    if (pesquisa.regiao) {
        command += ` AND r.nome LIKE ?`;
        valores.push(`%${pesquisa.regiao}%`);
    }

    if (pesquisa.curso) {
        command += ` AND c.nome LIKE ?`;
        valores.push(`%${pesquisa.curso}%`);
    }

    if (pesquisa.instituicao) {
        command += ` AND i.nome LIKE ?`;
        valores.push(`%${pesquisa.instituicao}%`);
    }

    if (pesquisa.nivel) {
        command += ` AND o.nivel LIKE ?`;
        valores.push(`%${pesquisa.nivel}%`);
    }

    if (pesquisa.modalidade) {
        command += ` AND o.modalidade LIKE ?`;
        valores.push(`%${pesquisa.modalidade}%`);
    }

    if (pesquisa.precoMinimo !== undefined && pesquisa.precoMinimo !== null && pesquisa.precoMinimo !== "") {
        command += `AND o.preco >= ?`;
        valores.push(pesquisa.precoMinimo);
    }

    if (pesquisa.precoMaximo !== undefined && pesquisa.precoMaximo !== null && pesquisa.precoMaximo !== "") {
        command += ` AND o.preco <= ?`;
        valores.push(pesquisa.precoMaximo);
    }

    command += `
        ORDER BY
            r.nome ASC,
            b.nome ASC,
            i.nome ASC,
            c.nome ASC,
            o.nivel ASC;
    `;

    const [resposta] = await con.query(command, valores);

    return resposta;
}

export async function deleteOfertas(id) {
    const command = `
        delete from ofertas_cursos
        where id_oferta = ?
    `

    const resposta = await con.query(command, [id]);

    return resposta;
}

export async function InserirOfertaLista(usuario, oferta) {
    const command = `
     INSERT INTO Ofertas_Lista_Usuarios(id_usuario, id_oferta)
        values(?, ?)
     `

    const [resposta] = await con.query(command, [
        usuario,
        oferta
    ]);

    return resposta.insertId;
}

export async function getListaOfertas(id_usuario) {
    const command = `
        SELECT
            olu.id_lista,
            u.id_usuario,
            o.id_oferta AS id,
            c.id_curso,
            c.nome AS curso,
            o.nivel,
            o.preco,
            o.carga_horaria,
            o.modalidade,
            o.descricao,
            o.link_inscricao,
            o.imagem,
            i.id_instituicao,
            i.nome AS instituicao,
            un.id_unidade,
            un.nome AS unidade,
            un.endereco,
            un.numero,
            un.cep,
            b.id_bairro,
            b.nome AS bairro,
            r.id_regiao,
            r.nome AS regiao
        FROM Ofertas_Lista_Usuarios AS olu
        INNER JOIN usuarios AS u
            ON olu.id_usuario = u.id_usuario
        INNER JOIN ofertas_cursos AS o
            ON olu.id_oferta = o.id_oferta
        INNER JOIN cursos AS c
            ON o.id_curso = c.id_curso
        INNER JOIN unidades AS un
            ON o.id_unidade = un.id_unidade
        INNER JOIN instituicoes AS i
            ON un.id_instituicao = i.id_instituicao
        INNER JOIN bairros AS b
            ON un.id_bairro = b.id_bairro
        INNER JOIN regioes AS r
            ON b.id_regiao = r.id_regiao
        WHERE u.id_usuario = ?
        ORDER BY olu.id_lista DESC;
    `

    const [resposta] = await con.query(command, [
        id_usuario
    ]);

    return resposta;
}