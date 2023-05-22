const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
app.use(bodyParser.json());

// Middleware para fazer o roteamento para o microserviço correspondente
// Middleware para fazer o roteamento para o microserviço correspondente
const routeToMicroservice = async (req, res, next) => {
  try {
    const { microservice, method, path, body } = req.body;

    // Verifica se o microserviço solicitado existe
    if (!microserviceRoutes[microservice]) {
      throw new Error(`Microserviço não encontrado: ${microservice}`);
    }

    // Verifica se a rota para o método solicitado existe no microserviço
    if (!microserviceRoutes[microservice].routes[method]) {
      throw new Error(`Rota não encontrada para o método ${method}`);
    }

    // Obtém as informações de rota para o microserviço
    const { baseURL, routes } = microserviceRoutes[microservice];
    const routePath = routes[method];

    // Constrói a URL completa para a requisição ao microserviço
    const url = `${baseURL}${routePath}`;

    // Faz a requisição para o microserviço correspondente
    const response = await axios[method.toLowerCase()](url, body);

    // Retorna a resposta do microserviço
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao processar a requisição:', error.message);
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
};

// Defina as informações de roteamento para cada microserviço
const microserviceRoutes = {
  microservico1: {
    baseURL: 'http://localhost:3006',
    routes: {
      'POST': '/controle-acesso',
      'DELETE': '/controle-acesso/:idUsuario/:idSala',
      'GET': '/controle-acesso/:idSala',
    },
  },
  microservico2: {
    baseURL: 'http://localhost:3001',
    routes: {
      'POST': '/cadastro-salas',
      'GET': '/cadastro_salas',
    },
  },
  microservico3: {
    baseURL: 'http://localhost:3000',
    routes: {
      'POST': '/cadastro-usuarios',
      'GET': '/cadastro-usuarios/:id',
    },
  },
  microservico4: {
    baseURL: 'http://localhost:3005',
    routes: {
      'POST': '/liberacao-acesso',
      'DELETE': '/liberacao-acesso/:idUsuario/:idSala',
      'GET': '/liberacao-acesso/:idSala',
    },
  },
  microservico5: {
    baseURL: 'http://localhost:3004',
    routes: {
      'POST': '/registro-acesso',
      'GET': '/registro-acesso/:id',
    },
  },
};

// Registra as rotas para cada microserviço
Object.entries(microserviceRoutes).forEach(([microservice, config]) => {
  Object.entries(config.routes).forEach(([method, route]) => {
    app[method.toLowerCase()](`/${microservice}${route}`, routeToMicroservice);
  });
});

// Outras rotas e funcionalidades do API Gateway...

app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
