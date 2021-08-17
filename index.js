const express = require("express");

const app = express();
app.use(express.json());

const listaDeInstrutores = [
    {
        id: 1,
        nome: "Amanda",
        idade: 19,
        areaDeAtuacao: "front-end"
    },
    {
        id: 2,
        nome: "Cassio",
        idade: 21,
        areaDeAtuacao: "mobile"
    },
    {
        id: 3,
        nome: "Fabricio",
        idade: 19,
        areaDeAtuacao: "produto"
    },
    {
        id: 4,
        nome: "Lucy",
        idade: 18,
        areaDeAtuacao: "back-end"
    }
];

let proximoId = 5;



app.get("/instrutores", (req, resp) => {
    resp.json(listaDeInstrutores);
});

app.get("/instrutores/:id", (req,resp) => {
    const {id} = req.params;

    const encontrandoInstrutor = listaDeInstrutores.find(x => x.id === Number(id));

    if(!encontrandoInstrutor){
        resp.status(400).json("Instrutor não encontrado");
    }

    resp.json(encontrandoInstrutor);
    
});

app.post("/instrutores", (req, resp) => {
   const novoInstrutor = {
       id: proximoId,
       nome: req.body.nome,
       idade: req.body.idade,
       areaDeAtuacao: req.body.areaDeAtuacao,
   };

   listaDeInstrutores.push(novoInstrutor);

   proximoId += 1;

   resp.json(novoInstrutor);
});

app.patch("/instrutores/:id", (req, resp) => {
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

});

app.put("/instrutores/:id", (req,resp) => {
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
});

app.delete("/instrutores/:id", (req,resp) => {
    const {id} = req.params;

    const excluirInstrutor = listaDeInstrutores.find(x => x.id === Number(id));

    const pegandoIndice = listaDeInstrutores.indexOf(excluirInstrutor);

    listaDeInstrutores.splice(pegandoIndice,1);

    resp.json(excluirInstrutor);
});














app.listen(8000);