import { useState } from 'react';
import './Login.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para autenticar o usuário
    alert(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className='container'>
        <h1>EasyTask</h1>
        <div className='form-login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Nome de usuário:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                Senha:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Entrar" />
            </form>
        </div>
    </div>
    
  );
}

export default Login;
