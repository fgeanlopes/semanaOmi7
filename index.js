const express = require("express");

const server = express();

//Instrução para express ler json
server.use(express.json());

// *** QUERY PARAMS ***
/*server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}` });
});*/

// *** ROUTER PARAMS ***
/*server.get("/users/:id", (req, res) => {
  const {id} = req.params;
  return res.json({ message: `Buscando o usuário ${id}` });
});*/

const users = ["Diego", "Mateus", "Gabriel"];
//Listagem de todos os usuário
server.get("/users", (req, res) => {
  return res.json(users);
});

//Listagem de um usuário
server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

// *** REQUEST BODY ***
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);
  return res.json(users);
});

//porta do servidor
server.listen(3000);
