const bcrypt = require('bcrypt');

async function routes(fastify, options) {
  fastify.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await fastify.prisma.user.findUnique({ where: { username } });


    if (!user) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }


    const token = fastify.jwt.sign({ id: user.id, username: user.username });
    res.send({ token });
  });

  
}

module.exports = routes;
