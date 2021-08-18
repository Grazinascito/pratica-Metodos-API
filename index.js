const express = require("express");

//importando os dados

const {consultaDeTodos,
    consultaDeUm,
    criandoUmInstrutor,
    alterandoInstrutor,
    criandoEalterando,
    deletarUmInstrutor
} = require("./controladores/instrutores");

const {logarRequisicao, travaDeSenha} = require("./intermediarios");

const app = express();
app.use(express.json());

//todo dado passa pelo intermediarios, antes de chegar no roteador
//intermediarios
app.use(logarRequisicao);
app.use(travaDeSenha);

//roteadores
app.get("/instrutores", consultaDeTodos);

app.get("/instrutores/:id", consultaDeUm);

app.post("/instrutores", criandoUmInstrutor);

app.patch("/instrutores/:id", alterandoInstrutor);

app.put("/instrutores/:id", criandoEalterando);

app.delete("/instrutores/:id", deletarUmInstrutor);


app.listen(8000);