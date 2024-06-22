import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/to-do-list.png';

// alert("Utilize 'admin' como nome de usuário e senha para realizar login.")

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Login: '+ username+', '+ password)
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login falhou');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigate('/todos');
    } catch (error) {
      console.error('Error:', error);
      setError(true);
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setError(false);
  };

  return (
    <div className="container">
      <div className="frase">
        <h1>EasyTask <img src={logo} alt="Logo"/></h1>
        <p>Bem-vindo ao EasyTask, seu melhor companheiro na hora de organizar tarefas do cotidiano!</p>
      </div>

      <div className='content'>
        <div className="form-login">
          <h2>Realize o login:</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome de usuário:</label>
            <input id="username" name="username" type="text" value={username} onChange={handleInputChange(setUsername)} />

            <label>Senha:</label>
            <input id="password" name="password" type="password" value={password} onChange={handleInputChange(setPassword)} />

            {error && <p className="strong">Dados incorretos ou usuário não existe. Tente novamente!</p>}

            <button type="submit">Entrar</button>
          </form>
        </div>

        <div className="form-cadastro">
          <h2>Ainda não é cadastrado? Faça-o agora:</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome de usuário:</label>
            <input id="username" name="username" type="text" value={username} onChange={handleInputChange(setUsername)} />

            <label>Senha:</label>
            <input id="password" name="password" type="password" value={password} onChange={handleInputChange(setPassword)} />

            {error && <p className="strong">Dados incorretos ou usuário não existe. Tente novamente!</p>}

            <button type="submit">Entrar</button>
          </form>
        </div> /* form-cadastro */
      </div>

      
    </div>
  );
}

export default Login;
