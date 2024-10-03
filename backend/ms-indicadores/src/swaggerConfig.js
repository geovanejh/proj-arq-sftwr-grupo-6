const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de OEE dos Operadores',
      version: '1.0.0',
      description: 'Documentação da API para o cálculo de OEE por máquina e operadores.',
      contact: {
        name: 'Equipe Especialização Engenharia de Software',
        email: 'equipe2@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/*.js'], // Corrigido para buscar todas as rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
