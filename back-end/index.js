const express = require("express");
const fs = require("fs");
const caminhoBanco = "db.json";

////////////////////////////////////////////////////////////////////////////////

let Dados = loadDados();

function loadDados() {
    try {
        const data = fs.readFileSync(caminhoBanco); 
        return JSON.parse(data); 
    }
    catch (error) {
        console.error("Erro ao carregar dados do arquivo:", error); 
        return []; 
    }
}

function saveDados() {
    try {
        const data = JSON.stringify(Dados, null, 2); 
        fs.writeFileSync(caminhoBanco, data); 
    }

    catch (error) {
        console.error("Erro ao salvar dados no arquivo:", error); //Ocorrendo um erro é exibido no console a mensagem de erro.
    }
}

const app = express();


/////////////////////////////////////////////////////////////////////////////////

app.use(express.json());

//retornando todos os dados

app.get("/dados", (req, res) => {
    res.statusCode = 200; //200 é ok deu certo 
    res.json(Dados) //Os dados são convertidos para o formato JSON antes de serem enviados como resposta
});

//criando um novo personagem

app.post("/criar-personagem", (req, res) => {
    
    let { Nome,
        Idade,
        Genero,
        Epoca,
        Local,
        Atributos,
        Perícias,
        Ataque1,
        Ataque2,
        Ações,
        Ritual } = req.body;


        const nomeExistente = Dados.find((personagem) => personagem.Nome === Nome);
        if (nomeExistente) {
            return res.status(409).json({
                error: "Já existe um personagem com este nome.",
            });
        }

        const novoPersonagem = {
            Nome,
            Idade,
            Genero,
            Epoca,
            Local,
            Atributos,
            Perícias,
            Ataque1,
            Ataque2,
            Ações,
            Ritual,
        };

        Dados.push(novoPersonagem);

    saveDados(); //Salva o produtos que tá no arquivo com base no produtos que tem aqui 
    res.statusCode = 200; //200 é ok deu certo
    res.json({ Erro: "Salvo com sucesso!" });
});






app.listen(45678, () => {
    console.log("Api rodando!");
});

