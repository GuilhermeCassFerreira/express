const express = require('express');
const db = require('./dbConnection');

const router = express.Router();

const PORT = 3004;
// Rota para adicionar acesso de um usuário a uma sala
router.post('/controle-acesso', (req, res) => {
  const { idUsuario, idSala } = req.body;

  const query = 'INSERT INTO controle_acesso (id_usuario, id_sala) VALUES (?, ?)';
  db.query(query, [idUsuario, idSala], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar acesso:', err);
      res.status(500).json({ error: 'Erro ao adicionar acesso' });
    } else {
      res.status(200).json({ message: 'Acesso adicionado com sucesso' });
    }
  });
});

// Rota para remover acesso de um usuário a uma sala
router.delete('/controle-acesso/:idUsuario/:idSala', (req, res) => {
  const { idUsuario, idSala } = req.params;

  const query = 'DELETE FROM controle_acesso WHERE id_usuario = ? AND id_sala = ?';
  db.query(query, [idUsuario, idSala], (err, result) => {
    if (err) {
      console.error('Erro ao remover acesso:', err);
      res.status(500).json({ error: 'Erro ao remover acesso' });
    } else {
      res.status(200).json({ message: 'Acesso removido com sucesso' });
    }
  });
});

// Rota para obter os usuários com acesso a uma sala
router.get('/controle-acesso/:idSala', (req, res) => {
  const { idSala } = req.params;

  const query = 'SELECT * FROM controle_acesso WHERE id_sala = ?';
  db.query(query, [idSala], (err, result) => {
    if (err) {
      console.error('Erro ao obter usuários com acesso:', err);
      res.status(500).json({ error: 'Erro ao obter usuários com acesso' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Outras rotas e funcionalidades do serviço de controle de acesso...


router.listen(PORT, () => {
  console.log(`Microserviço de controle de acesso rodando na porta ${PORT}`);
});