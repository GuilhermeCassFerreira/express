const express = require('express');
const db = require('./dbConnection');

const router = express.Router();
const PORT = 3006;
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

  const query = 'SELECT id_usuario FROM controle_acesso WHERE id_sala = ?';
  db.query(query, [idSala], (err, result) => {
    if (err) {
      console.error('Erro ao obter usuários com acesso:', err);
      res.status(500).json({ error: 'Erro ao obter usuários com acesso' });
    } else {
      const usuarios = result.map((row) => row.id_usuario);
      res.status(200).json({ usuarios });
    }
  });
});

// Rota para verificar se um usuário tem acesso a uma sala
router.get('/liberacao-acesso/:idUsuario/:idSala', (req, res) => {
  const { idUsuario, idSala } = req.params;

  const query = 'SELECT COUNT(*) AS count FROM controle_acesso WHERE id_usuario = ? AND id_sala = ?';
  db.query(query, [idUsuario, idSala], (err, result) => {
    if (err) {
      console.error('Erro ao verificar acesso:', err);
      res.status(500).json({ error: 'Erro ao verificar acesso' });
    } else {
      const temAcesso = result[0].count > 0;
      res.status(200).json({ temAcesso });
    }
  });
});

// Rota para registrar uma tentativa de acesso
router.post('/registro-acessos', (req, res) => {
  const { idUsuario, idSala, sucesso } = req.body;

  const query = 'INSERT INTO registro_acessos (id_usuario, id_sala, sucesso) VALUES (?, ?, ?)';
  db.query(query, [idUsuario, idSala, sucesso], (err, result) => {
    if (err) {
      console.error('Erro ao registrar acesso:', err);
      res.status(500).json({ error: 'Erro ao registrar acesso' });
    } else {
      res.status(200).json({ message: 'Acesso registrado com sucesso' });
    }
  });
});

router.listen(PORT, () => {
  console.log(`Microserviço de controle de acesso rodando na porta ${PORT}`);
});