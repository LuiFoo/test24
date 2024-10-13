// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para salvar o nome em JSON
app.post('/salvar-nome', (req, res) => {
    const nome = req.body.nome;

    // Obter dados existentes
    let nomesExistentes = [];
    if (fs.existsSync('nomes.json')) {
        const dados = fs.readFileSync('nomes.json');
        nomesExistentes = JSON.parse(dados);
    }

    // Adicionar novo nome
    nomesExistentes.push({ nome });

    // Salvar em arquivo JSON
    fs.writeFileSync('nomes.json', JSON.stringify(nomesExistentes, null, 2));
    res.send('Nome salvo com sucesso!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
