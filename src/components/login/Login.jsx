import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import logo from '../../assets/to-do-list.png'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
  }, [username, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para autenticar o usuário
    if( username === "admin" && password === "admin"){
      navigate('/todo');
      setError(false);
    }else{
      setError(true);
    }
    
  };

  return (
    <div className='container'>
        <div className='frase'>
          <h1>EasyTask <img src={logo} alt="Logo"/></h1>
          <p>Bem-vindo ao EasyTask, seu melhor companheiro na hora de organizar tarefas do cotidiano!</p>
        </div>

        <div className='form-login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                
                <label>Nome de usuário:</label>
                <input id='username' name='username' type="text" value={username} onChange={e => setUsername(e.target.value)} />

                <label>Senha:</label>
                <input id='password' name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />

                {error && <p className='strong'>Dados incorretos ou usuário não existe. Tente novamente!</p>}

                <button type='submit'>Entrar</button>
            </form>
        </div>
    </div>
    
  );
}

export default Login;
