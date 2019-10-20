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

server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

//middle

function checkUserExits(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ erro: "user name is requierd" });
  }
  return next();
}

function checkInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  //pegando a variavel criada acima
  req.user = user;

  return next();
}

//Listagem de todos os usuário
server.get("/users", (req, res) => {
  return res.json(users);
});

//Listagem de um usuário
server.get("/users/:index", checkInArray, (req, res) => {
  return res.json(req.user);
});

// *** REQUEST BODY ***
server.post("/users", checkUserExits, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//*** EDITAR ***/
server.put("/users/:index", checkUserExits, checkInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//*** DELETE ***/
server.delete("/users/:index", checkInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

//porta do servidor
server.listen(3000);
