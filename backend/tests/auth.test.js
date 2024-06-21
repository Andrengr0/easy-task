const app = require('../index');

describe('Autenticacao', () => {
  it('deve retornar um token JWT para credenciais válidas', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'admin',
        password: 'admin'
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.payload)).toHaveProperty('token');
  });

  it('deve falhar para credenciais inválidas', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'invalid',
        password: 'invalid'
      }
    });

    expect(res.statusCode).toEqual(401);
  });
});
