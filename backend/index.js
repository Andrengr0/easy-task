const fastify = require('fastify')({ logger: true });
const prisma = require('./prismaClient');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('@fastify/cors');

// Adicionar o prisma no fastify
fastify.decorate('prisma', prisma);

// Registrar o plugin JWT
fastify.register(require('@fastify/jwt'), {
  secret: 'Exemplo#321'
});

// Registrar o plugin CORS
fastify.register(cors, {
  origin: '*'  // Configuração de exemplo
});

// Registrar rotas de autenticação
fastify.register(authRoutes);

// Registrar outras rotas
fastify.register(todoRoutes);

// Exportar a instância do fastify para testes
module.exports = fastify;

// Iniciar o servidor apenas se o módulo não for chamado por um test runner
if (require.main === module) {
  const start = async () => {
    try {
      await fastify.listen(3000);
      fastify.log.info(`Servidor rodando na porta ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  
  start();
}
