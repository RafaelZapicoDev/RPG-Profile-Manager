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

app.post("/produto", (req, res) => {
    
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

    saveDados(); 
    res.statusCode = 200; //200 é ok deu certo
    res.json({ Erro: "Salvo com sucesso!" });
});

//deletando um personagem

app.delete("/dado/:nome", (req, res) => {
    const { nome } = req.params; 

    if (!isNaN(nome)) {
        res.status(400).json({ Erro: "Informe um nome válido!" });
    } else {
        // achar o index
        const indexPersonagem = Dados.findIndex((personagem) => personagem.Nome === nome);

        if (indexPersonagem === -1) {
            res.status(404).json({
                Erro: "Não existe um personagem com este nome.",
            });
        } else {
            Dados.splice(indexPersonagem, 1);
            saveDados();
            res.status(200).json({
                message: "Personagem removido com sucesso.",
            });
        }
    }
});







app.listen(45678, () => {
    console.log("Api rodando!");
});

