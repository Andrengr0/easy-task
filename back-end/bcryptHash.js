const bcrypt = require('bcrypt');

async function hashPassword() {
  try {
    const password = 'admin'; // Sua senha 'admin' atual
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Senha criptografada:', hashedPassword);
  } catch (error) {
    console.error('Erro ao criptografar senha:', error);
  }
}

hashPassword();
