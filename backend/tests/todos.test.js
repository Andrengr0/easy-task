const app = require('../index');
let token;

beforeAll(async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/login',
    payload: {
      username: 'admin',
      password: 'admin'
    }
  });

  token = JSON.parse(res.payload).token;
});

describe('Todos', () => {
  it('deve criar uma nova tarefa', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/cadastrar/todo',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        text: 'Test Todo',
        category: 'Trabalho'
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.payload)).toHaveProperty('id');
    expect(JSON.parse(res.payload).text).toBe('Test Todo');
  });

  it('deve obter todos os todos para o usuário autenticado', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/todos',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(JSON.parse(res.payload))).toBeTruthy();
  });

  it('deve atualizar uma tarefa existente', async () => {
    const newTodo = await app.inject({
      method: 'POST',
      url: '/cadastrar/todo',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        text: 'Update Test',
        category: 'Work'
      }
    });

    const res = await app.inject({
      method: 'PUT',
      url: `/alterar/todo/${JSON.parse(newTodo.payload).id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        isCompleted: true
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.payload).isCompleted).toBe(true);
  });

  it('Deve deletar um todo existente', async () => {
    const newTodo = await app.inject({
      method: 'POST',
      url: '/cadastrar/todo',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        text: 'Delete Test',
        category: 'Work'
      }
    });

    const res = await app.inject({
      method: 'DELETE',
      url: `/deletar/todo/${JSON.parse(newTodo.payload).id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.payload)).toHaveProperty('message', 'Tarefa deletada com sucesso');
  });
});
