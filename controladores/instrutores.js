const listaDeInstrutores = require("../dados/instrutores");

function consultaDeTodos(req, resp){
    resp.json(listaDeInstrutores);
};

function consultaDeUm(req,resp){
    const {id} = req.params;

    const encontrandoInstrutor = listaDeInstrutores.find(x => x.id === Number(id));

    if(!encontrandoInstrutor){
        resp.status(404).json("Instrutor não encontrado");
        return;
    }
    resp.json(encontrandoInstrutor);
};

let proximoId = 5;

function criandoUmInstrutor (req, resp){

    if(!req.body.nome){
        resp.status(400).json({erro: "O campo 'nome' é obrigatório"});
        return;
    }
    if(!req.body.idade){
        resp.status(400).json({erro: "O campo 'idade' é obrigatório"});
        return;
    }
    if(!req.body.areaDeAtuacao){
        resp.status(400).json({erro: "O campo 'areaDeAtuacao' é obrigatório"});
        return;
    }
    if(typeof req.body.nome !== "string"){
        resp.status(400).json({erro: "O campo 'nome' deve ser preenchido com um texto."});
        return;
    }
    if(typeof req.body.idade !== "number"){
        resp.status(400).json({erro: "O campo 'idade' deve ser preenchido com um numero."});
        return;
    }
    

    const novoInstrutor = {
        id: proximoId,
        nome: req.body.nome,
        idade: req.body.idade,
        areaDeAtuacao: req.body.areaDeAtuacao,
    };
 
    listaDeInstrutores.push(novoInstrutor);
 
    proximoId += 1;
 
    resp.json(novoInstrutor);
};

function alterandoInstrutor (req, resp){
    const {id} = req.params;
    const alterandoInstrutor = listaDeInstrutores.find(x => x.id === Number(id));
    if(req.body.nome !== undefined){

        alterandoInstrutor.nome = req.body.nome;
    }
    if(req.body.idade !== undefined){

        alterandoInstrutor.idade = req.body.idade;
    }
    if(req.body.areaDeAtuacao !== undefined){
        
        alterandoInstrutor.areaDeAtuacao = req.body.areaDeAtuacao;
    }
    resp.json(alterandoInstrutor);
};

function criandoEalterando(req, resp){
    const {id} = req.params;

    const alterandoInstrutor = listaDeInstrutores.find(x => x.id === Number(id));

    if(alterandoInstrutor){
        alterandoInstrutor.nome = req.body.nome;
        alterandoInstrutor.idade = req.body.idade;
        alterandoInstrutor.areaDeAtuacao = req.body.areaDeAtuacao;

        resp.json(alterandoInstrutor);
    }else{
        const novoInstrutor = req.body;
        listaDeInstrutores.push(novoInstrutor);
        resp.json(novoInstrutor);
    }
};

function deletarUmInstrutor(req, resp){
     const {id} = req.params;

    const excluirInstrutor = listaDeInstrutores.find(x => x.id === Number(id));

    const pegandoIndice = listaDeInstrutores.indexOf(excluirInstrutor);

    listaDeInstrutores.splice(pegandoIndice,1);

    resp.json(excluirInstrutor);
};

module.exports = {
    consultaDeTodos,
    consultaDeUm,
    criandoUmInstrutor,
    alterandoInstrutor,
    criandoEalterando,
    deletarUmInstrutor,
};