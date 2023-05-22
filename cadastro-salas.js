const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const connection = require('./dbConnection');

// Cadastrar Sala
app.post('/cadastro_salas', (req, res) => {
  const { numero, predio } = req.body;
  const query = 'INSERT INTO salas (numero, predio) VALUES (?, ?)';
  connection.query(query, [numero, predio], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar sala: ' + err.stack);
      res.status(500).send('Erro ao cadastrar sala.');
    } else {
      console.log('Sala cadastrada com sucesso!');
      res.status(200).send('Sala cadastrada com sucesso!');
    }
  });
});

// Obter todas as Salas
app.get('/cadastro_salas', (req, res) => {
  const query = 'SELECT * FROM cadastro_salas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter salas: ' + err.stack);
      res.status(500).send('Erro ao obter salas.');
    } else {
      console.log('Total de salas cadastradas: ' + results.length);
      res.status(200).send(results);
    }
  });
});

// Obter Sala por número
app.get('/salas/:id', (req, res) => {
  const numeroSala = req.params.numero;
  const query = 'SELECT * FROM salas WHERE numero = ?';
  connection.query(query, [numeroSala], (err, result) => {
    if (err) {
      console.error('Erro ao obter sala: ' + err.stack);
      res.status(500).send('Erro ao obter sala.');
    } else if (result.length === 0) {
      console.log('Sala não encontrada.');
      res.status(404).send('Sala não encontrada.');
    } else {
      res.status(200).send(result[0]);
    }
  });
});

// Atualizar Sala por número
app.put('/salas/:numero', (req, res) => {
  const numeroSala = req.params.numero;
  const { predio } = req.body;
  const query = 'UPDATE salas SET predio = ? WHERE numero = ?';
  connection.query(query, [predio, numeroSala], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar sala: ' + err.stack);
      res.status(500).send('Erro ao atualizar sala.');
    } else if (result.affectedRows === 0) {
      console.log('Sala não encontrada.');
      res.status(404).send('Sala não encontrada.');
    } else {
      console.log('Sala atualizada com sucesso!');
      res.status(200).send('Sala atualizada com sucesso!');
    }
  });
});

// Deletar Sala por número
app.delete('/salas/:numero', (req, res) => {
  const numeroSala = req.params.numero;
  const query = 'DELETE FROM salas WHERE numero = ?';
  connection.query(query, [numeroSala], (err, result) => {
    if (err) {
      console.error('Erro ao deletar sala: ' + err.stack);
      res.status(500).send('Erro ao deletar sala.');
    } else if (result.affectedRows === 0) {
      console.log('Sala não encontrada.');
      res.status(404).send('Sala não encontrada.');
    } else {
      console.log('Sala deletada com sucesso!');
      res.status(200).send('Sala deletada com sucesso!');
    }
  });
});

app.listen(3001, () => {
  console.log('Microservice de Cadastro de Salas rodando na porta 3001');
});
