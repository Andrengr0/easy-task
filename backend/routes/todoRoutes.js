async function routes(fastify, options) {
    
      fastify.decorate('authenticate', async function(req, res) {
        try {
          await req.jwtVerify();
        } catch (err) {
          res.code(401).send({ error: 'Autenticação falhou' });
        }
      });
      
    fastify.get('/todos', { preValidation: [fastify.authenticate] }, async (req, res) => {
      try {
        const todos = await fastify.prisma.todo.findMany({
          where: { userId: req.user.id }
        });
        res.send(todos);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        res.status(500).send({ error: 'Falha ao carregar tarefas' });
      }
    });
  
  
    fastify.post('/cadastrar/todo', { preValidation: [fastify.authenticate] }, async (req, res) => {
      try {
        const { text, category } = req.body;
        const newTodo = await fastify.prisma.todo.create({
          data: {
            text,
            category,
            userId: req.user.id
          }
        });
        res.send(newTodo);
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).send({ error: 'Falha ao criar tarefa' });
      }
    });
  
    fastify.put('/alterar/todo/:id', { preValidation: [fastify.authenticate] }, async (req, res) => {
      try {
        const { id } = req.params;
        const { isCompleted } = req.body;
  
        const updatedTodo = await fastify.prisma.todo.update({
          where: { id: Number(id) },
          data: { isCompleted }
        });
        res.send(updatedTodo);
      } catch (error) {
        console.error('Erro ao alterar tarefa:', error);
        res.status(500).send({ error: 'Falha ao alterar tarefa' });
      }
    });
  
    fastify.delete('/deletar/todo/:id', { preValidation: [fastify.authenticate] }, async (req, res) => {
      try {
        const { id } = req.params;
  
        await fastify.prisma.todo.delete({
          where: { id: Number(id) }
        });
        res.send({ message: 'Tarefa deletada com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).send({ error: 'Falha ao deletar tarefa' });
      }
    });
  }
  
  module.exports = routes;
  