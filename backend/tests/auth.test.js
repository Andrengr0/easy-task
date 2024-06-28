const app = require('../index');

describe('Autenticação', () => {
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

  it('deve cadastrar um novo usuário com sucesso', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        username_cad: 'novousuario',
        password_cad: 'novasenha'
      }
    });

    expect(res.statusCode).toEqual(201);
    expect(JSON.parse(res.payload)).toHaveProperty('message', 'Usuário cadastrado com sucesso!');
  });

  it('deve retornar erro ao tentar cadastrar usuário com nome de usuário já existente', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        username_cad: 'admin',
        password_cad: 'novasenha'
      }
    });

    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.payload)).toHaveProperty('message', 'Nome de usuário indisponível');
  });

  it('deve retornar erro ao tentar cadastrar usuário com nome de usuário ou senha com menos de 5 caracteres', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        username_cad: 'abc',
        password_cad: '123' 
      }
    });

    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.payload)).toHaveProperty('message', 'O nome de usuário e a senha devem ter pelo menos 5 caracteres.');
  });
});
