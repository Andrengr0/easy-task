import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/to-do-list.png';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [formType, setFormType] = useState('login');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisibleState, setIsConfirmPasswordVisibleState] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisibleState(!isConfirmPasswordVisibleState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      let endpoint = '';
      let body = {};

      if (formType === 'login') {
        endpoint = 'login';
        body = { username, password };
      } else if (formType === 'register') {
        if (password !== confirmPassword) {
          throw new Error('As senhas digitadas não coincidem.');
        }

        if (username.length < 5 || password.length < 5) {
          throw new Error('O nome de usuário e a senha devem ter pelo menos 5 caracteres.');
        }

        endpoint = 'register';
        body = { username_cad: username, password_cad: password };
      }

      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (formType === 'login' ? 'Dados incorretos ou usuário não existe' : 'Cadastro falhou'));
      }

      if (formType === 'login') {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/todos');
      } else {
        setSuccessMessage('Cadastro realizado com sucesso. Faça login para continuar.');
        setFormType('success');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Ocorreu um erro durante o processamento.');
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setError('');
  };

  const switchFormType = (type) => {
    setFormType(type);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMessage('');
    setIsConfirmPasswordVisible(type === 'register');
  };

  return (
    <div className="container">
      <div className="frase">
        <h1>EasyTask <img src={logo} alt="Logo" /></h1>
        <p className="slogan">Seu melhor companheiro na organização de tarefas do cotidiano!</p>
      </div>
      {formType === 'login' ? (
        <div className="form-login">
          <h2>Realize o login:</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome de usuário:</label>
            <input id="username" name="username" type="text" value={username} maxLength={30} onChange={handleInputChange(setUsername)} />

            <label>Senha:</label>
            <div className="password-container">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                maxLength={20}
                onChange={handleInputChange(setPassword)}
              />
              <i
                className={`fa ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
              />
            </div>

            {error && <p className="strong">{error}</p>}

            <button type="submit">Entrar</button>
          </form>
          <p>Ainda não tem uma conta? <a onClick={() => switchFormType('register')}>Cadastre-se</a></p>
        </div>
      ) : formType === 'register' ? (
        <div className="form-cadastro">
          <h2>Realize seu cadastro:</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome de usuário:</label>
            <input id="username_cad" name="username_cad" type="text" value={username} maxLength={30} onChange={handleInputChange(setUsername)} />

            {username.length > 0 && username.length < 5 && (
              <p className="strong">O nome de usuário deve ter pelo menos 5 caracteres.</p>
            )}

            {username.length === 30 && (
              <p className="strong">Máximo 30 caracteres.</p>
            )}

            <label>Senha:</label>
            <div className="password-container">
              <input
                id="password_cad"
                name="password_cad"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                maxLength={20}
                onChange={handleInputChange(setPassword)}
              />
              <i
                className={`fa ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
              />
            </div>

            {password.length > 0 && password.length < 5 && (
              <p className="strong">A senha deve ter pelo menos 5 caracteres.</p>
            )}

            {password.length === 20 && (
              <p className="strong">Máximo 20 caracteres.</p>
            )}

            {isConfirmPasswordVisible && (
              <>
                <label>Confirme a senha:</label>
                <div className="password-container">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={isConfirmPasswordVisibleState ? 'text' : 'password'}
                    value={confirmPassword}
                    maxLength={20}
                    onChange={handleInputChange(setConfirmPassword)}
                  />
                  <i
                    className={`fa ${isConfirmPasswordVisibleState ? 'fa-eye' : 'fa-eye-slash'}`}
                    onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
              </>
            )}

            {confirmPassword.length === 20 && (
              <p className="strong">Máximo 20 caracteres.</p>
            )}

            {password !== confirmPassword && confirmPassword.length > 0 && (
              <p className="strong">As senhas digitadas não coincidem.</p>
            )}

            {error && <p className="strong">{error}</p>}

            <div className='box-button'>
              <button type="button" className='btn-voltar' onClick={() => switchFormType('login')}>Voltar</button>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-success">
          <h2>{successMessage}</h2>
          <button onClick={() => switchFormType('login')}>Fazer Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
