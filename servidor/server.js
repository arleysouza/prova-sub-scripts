const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();

// para conversão de application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const { insert, select } = require("./sql");

//usar a variável de ambiente PORT
const PORT = process.env.PORT || 3101;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}...`);
});

app.get("/select", async (req, res) => {
    res.send(await select());
});

app.get("/insert/:nro", async (req, res) => {
    res.send(await insert(req.params.nro));
});

// rota para os arquivos da pasta build do app
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));