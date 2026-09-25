import { Router } from "express";
import { postarCursoService } from "../Service/Curso/cursoService.js";
const endpoints = Router();

endpoints.post('/cursos', async (req, resp) => {
    try{
        const cursos = req.body;
        let curso = await postarCursoService(cursos);

        resp.send({
            id_oferta: curso
        })
    }
    catch(err){
        
    }

})

export default endpoints;