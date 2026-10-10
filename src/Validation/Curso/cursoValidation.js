import * as DBCursos from '../../Repository/Curso/cursosRepository.js'

export async function validarOferta(oferta){
    const validacao = await DBCursos.getOfertaExistente(oferta);

    if(validacao != null)
        throw new Error("Oferta já cadastrada");
}