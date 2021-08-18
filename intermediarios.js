function logarRequisicao(req, resp, next){
    console.log("intermediario: ")
    console.log(req.method, req.url);

    if(req.method === 'DELETE'){
        resp.send("Não podemos deletar o instrutor!");
    }else{

        next();
    }
};

function travaDeSenha(req, resp, next){
    console.log(req.query);

    if(req.method === "GET" || req.query.senha === '123456'){
        next();
    }else{
        resp.status(405).json({erro: "senha incorreta"});
    }
};

module.exports = {
    logarRequisicao,
    travaDeSenha,
};