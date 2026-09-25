import * as DBCursos from '../../Repository/Curso/cursosRepository.js'

export async function postarCursoService(curso){
    const response = await DBCursos.postarCurso(curso);

    return response;
}