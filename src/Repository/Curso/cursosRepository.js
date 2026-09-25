import con from "./connection.js";

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
            link_inscricao
        )
            values(?, ?, ?, ?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [
            curso.id_curso, 
            curso.id_unidade, 
            curso.nivel, 
            curso.preco, 
            curso.carga_horaria, 
            curso.modalidade,
            curso.descricao,
            curso.link_inscricao
    ]);

    return resposta.insertId;
}