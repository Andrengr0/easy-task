const bcrypt = require('bcrypt');

async function routes(fastify, options) {
  // Rota de login
  fastify.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await fastify.prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).send({ error: 'Nome de usuário ou senha inválido(a)' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ error: 'Nome de usuário ou senha inválido(a)' });
    }

    const token = fastify.jwt.sign({ id: user.id, username: user.username });
    res.send({ token });
  });

  // Rota de registro
  fastify.post('/register', async (req, res) => {
    const { username_cad, password_cad } = req.body;

    // Verificação mínima de caracteres
    if (username_cad.length < 5 || password_cad.length < 5) {
      return res.status(400).send({ message: 'O nome de usuário e a senha devem ter pelo menos 5 caracteres.' });
    }

    // Verifica se o nome de usuário já existe
    const userExists = await fastify.prisma.user.findUnique({
      where: { username: username_cad },
    });

    if (userExists) {
      return res.status(400).send({ message: 'Nome de usuário indisponível' });
    }

    // Hash
    const hashedPassword = await bcrypt.hash(password_cad, 10);

    // Cria o novo usuário no banco de dados
    const newUser = await fastify.prisma.user.create({
      data: {
        username: username_cad,
        password: hashedPassword,
      },
    });

    res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
  });
}

module.exports = routes;
