const fastify = require('fastify')({ logger: true });
const prisma = require('./prismaClient');
const routes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('@fastify/cors');

fastify.decorate('prisma', prisma);


  

// Registrar o plugin JWT
fastify.register(require('@fastify/jwt'), {
  secret: 'Exemplo#321'
});

// Registrar o plugin CORS
fastify.register(cors, {
    origin: '*'  // Configuração de exemplo
  });

// Registrar suas rotas
fastify.register(routes);
fastify.register(todoRoutes);

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
