const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../dbConnection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Hello
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

// Cadastrar Usuario
app.post('/Cadastro', (req, res) => {
  const { nome, email, cpf } = req.body;
  const query = 'INSERT INTO cadastro (nome, tipo, codigo, matricula) VALUES (?, ?, ?, ?)';
  connection.query(query, [nome, tipo, codigo, matricula], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário: ' + err.stack);
      res.status(500).send('Erro ao cadastrar usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(200).send('Usúario cadastrado com sucesso!');
    }
  });
});

// Obter todos os Usuarios
app.get('/Cadastro', (req, res) => {
  const query = 'SELECT * FROM cadastro';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter dados: ' + err.stack);
      res.status(500).send('Erro ao obter dados.');
    } else {
      console.log('Total de Usuarios na base de dados: ' + results.length);
      res.status(200).send(results);
    }
  });
});

// Obter Usuario por CPF
app.get('/Cadastro/:matricula', (req, res) => {
  const cpf = req.params.cpf;
  const query = 'SELECT * FROM cadastro WHERE matricula = ?';
  connection.query(query, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao obter dados: ' + err.stack);
      res.status(500).send('Erro ao obter dados.');
    } else if (result.length === 0) {
      console.log('Usuario não encontrado.');
      res.status(404).send('Usuario não encontrado.');
    } else {
      res.status(200).send(result[0]);
    }
  });
});

// Atualizar Usuario por CPF
app.put('/Cadastro/:matricula', (req, res) => {
  const cpf = req.params.cpf;
  const { nome, tipo, codigo } = req.body;
  const query = 'UPDATE cadastro SET nome = ?, tipo = ?, codigo = ? WHERE matricula = ?';
  connection.query(query, [nome, email, cpf], (err, result) => {
    if (err) {
      console.error('Erro ao alterar dados do Usuario: ' + err.stack);
      res.status(500).send("Erro ao alterar dados do Usuario.");
      } else if (result.affectedRows === 0) {
      console.log("Usuario não encontrado.");
      res.status(404).send("Usuario não encontrado.");
      } else {
      console.log("Usuario atualizado com sucesso!");
      res.status(200).send("Usuario atualizado com sucesso!");
      }
      });
      });
      
      // Deletar Usuario por CPF
      app.delete('/Cadastro/:matricula', (req, res) => {
      const matricula = req.params.matricula;
      const query = 'DELETE FROM cadastro WHERE matricula = ?';
      connection.query(query, [matricula], (err, result) => {
      if (err) {
      console.error('Erro ao deletar Usuario: ' + err.stack);
      res.status(500).send('Erro ao deletar Usuario.');
      } else if (result.affectedRows === 0) {
      console.log('Usuario não encontrado.');
      res.status(404).send('Usuario não encontrado.');
      } else {
      console.log('Usuario deletado com sucesso!');
      res.status(200).send('Usuario deletado com sucesso!');
      }
      });
      });
      
      // Iniciar o servidor
      app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
      });
