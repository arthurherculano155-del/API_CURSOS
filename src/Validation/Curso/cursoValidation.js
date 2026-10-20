import * as DBCursos from '../../Repository/Curso/cursosRepository.js'

export async function validarOferta(oferta){
    const validacao = await DBCursos.getOfertaExistente(oferta);

    if(validacao != null)
        throw new Error("Oferta já cadastrada");
}

export async function validarOfertaPorID(oferta){
    const validacao = await DBCursos.getOfertaExistentePorID(oferta);

    if(validacao == null)
        throw new Error("Oferta inexistente");
}

export async function validarOfertaLista(oferta, usuario){
    const validacao = await DBCursos.getListaOfertasValidacao(oferta, usuario)

    if(validacao[0] != null)
        throw new Error("Validação já está na lista")
}