async function routes(fastify, options) {
    
      fastify.decorate('authenticate', async function(req, res) {
        try {
          await req.jwtVerify();
        } catch (err) {
          res.code(401).send({ error: 'Authentication failed' });
        }
      });
      
    fastify.get('/todos', { preValidation: [fastify.authenticate] }, async (req, res) => {
      try {
        const todos = await fastify.prisma.todo.findMany({
          where: { userId: req.user.id }
        });
        res.send(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send({ error: 'Failed to fetch todos' });
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
        console.error('Error creating todo:', error);
        res.status(500).send({ error: 'Failed to create todo' });
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
        console.error('Error updating todo:', error);
        res.status(500).send({ error: 'Failed to update todo' });
      }
    });
  
    fastify.delete('/deletar/todo/:id', { preValidation: [fastify.authenticate] }, async (req, res) => {
      try {
        const { id } = req.params;
  
        await fastify.prisma.todo.delete({
          where: { id: Number(id) }
        });
        res.send({ message: 'Todo deleted successfully' });
      } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send({ error: 'Failed to delete todo' });
      }
    });
  }
  
  module.exports = routes;
  