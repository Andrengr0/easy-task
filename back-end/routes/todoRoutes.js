async function routes(fastify, options) {
    
      fastify.decorate('authenticate', async function(request, reply) {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      });
      
    fastify.get('/todos', { preValidation: [fastify.authenticate] }, async (request, reply) => {
      console.log('Chegou aqui na rota todo');
      try {
        const todos = await fastify.prisma.todo.findMany({
          where: { userId: request.user.id }
        });
        console.log('Todos fetched successfully:', todos);
        reply.send(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        reply.status(500).send({ error: 'Failed to fetch todos' });
      }
    });
  
    console.log('Chegou aqui no segundo ponto rota todo');
  
    fastify.post('/cadastrar/todo', { preValidation: [fastify.authenticate] }, async (request, reply) => {
      try {
        const { text, category } = request.body;
        const newTodo = await fastify.prisma.todo.create({
          data: {
            text,
            category,
            userId: request.user.id
          }
        });
        console.log('Todo created successfully:', newTodo);
        reply.send(newTodo);
      } catch (error) {
        console.error('Error creating todo:', error);
        reply.status(500).send({ error: 'Failed to create todo' });
      }
    });
  
    fastify.put('/alterar/todo/:id', { preValidation: [fastify.authenticate] }, async (request, reply) => {
      try {
        const { id } = request.params;
        const { isCompleted } = request.body;
  
        const updatedTodo = await fastify.prisma.todo.update({
          where: { id: Number(id) },
          data: { isCompleted }
        });
        console.log('Todo updated successfully:', updatedTodo);
        reply.send(updatedTodo);
      } catch (error) {
        console.error('Error updating todo:', error);
        reply.status(500).send({ error: 'Failed to update todo' });
      }
    });
  
    fastify.delete('/deletar/todo/:id', { preValidation: [fastify.authenticate] }, async (request, reply) => {
      try {
        const { id } = request.params;
  
        await fastify.prisma.todo.delete({
          where: { id: Number(id) }
        });
        console.log('Todo deleted successfully:', id);
        reply.send({ message: 'Todo deleted successfully' });
      } catch (error) {
        console.error('Error deleting todo:', error);
        reply.status(500).send({ error: 'Failed to delete todo' });
      }
    });
  }
  
  module.exports = routes;
  