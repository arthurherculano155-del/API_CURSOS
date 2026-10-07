import jwt from 'jsonwebtoken';

export function autenticar(req, resp, next){
    const autorizacao = req.headers.authorization;

    if(!autorizacao){
        resp.status(401).send({
            erro: "Token não informado."
        })
    }

    const token = autorizacao.split(" ")[1];

    try{
        const usuario = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next()
    }
    catch(err){
        resp.status(401).send({
            erro: "Token inválido ou expirado!"
        })
    }
}

export function apenasAdmin(req, resp, next) {
    if (req.usuario.cargo !== "admin") {
        return resp.status(403).send({
            erro: "Acesso permitido apenas para administradores!"
        });
    }

    next();
}