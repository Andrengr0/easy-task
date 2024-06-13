const bcrypt = require('bcrypt');

async function routes(fastify, options) {
  fastify.post('/login', async (req, reply) => {
    console.log('entrou na rota certa')
    const { username, password } = req.body;
    console.log('Chegou aqui. user: '+username+' senha: '+password)

    const user = await fastify.prisma.user.findUnique({ where: { username } });

    console.log('Nome do user no banco: '+user.username)

    if (!user) {
        console.log('Invalid username or password')
      return reply.status(401).send({ error: 'Invalid username or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.status(401).send({ error: 'Invalid username or password' });
    }

    console.log('User validado com sucesso!')

    const token = fastify.jwt.sign({ id: user.id, username: user.username });
    reply.send({ token });
    console.log(token)
  });

  
}

module.exports = routes;
