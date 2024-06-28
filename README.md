# EasyTask

EasyTask é uma aplicação de gerenciamento de tarefas simples e eficiente. Com EasyTask, você pode criar, visualizar, completar e deletar suas tarefas diárias. A aplicação inclui autenticação de usuário e está dividida em front-end e back-end. O front-end é desenvolvido usando React com Vite, e o back-end é construído com Fastify, Prisma e banco de dados PostgreSQL.

Nesse projeto foi utilizada IA (Inteligência Artificial) para fins de produtividade na construção de funcionalidades, e também aprendizado acerca de determinadas ferramentas aqui presentes.

## Funcionalidades

- Cadastro de usuário.
- Autenticação de usuário com JWT.
- Criação de tarefas com categorias.
- Visualização de todas as tarefas de um usuário.
- Marcação de tarefas como completas/incompletas.
- Exclusão de tarefas.

## Tecnologias Utilizadas

### Front-end

- React
- Vite
- CSS

### Back-end

- Fastify
- Prisma
- JWT (JSON Web Tokens)
- PostgreSQL

## Requisitos

- Node.js (versão 18 ou superior)
- NPM (versão 6 ou superior)
- Banco de dados PostgreSQL (versão 16 ou superior)

## Configuração do Projeto

### Na pasta raíz easy-task:

1. **Instale as dependências:**

    ```bash
    npm install
    ```

### Na pasta backend:

1. **Instale as dependências:**

    ```bash
    cd backend
    npm install
    ```

2. **Configure o Prisma:**

    O Prisma usa um arquivo de configuração `schema.prisma` que define o modelo do banco de dados. Certifique-se de que ele está configurado corretamente para o seu banco de dados. Por padrão, ele está configurado para usar SQLite.

3. **Migre o banco de dados:**

    ```bash
    npx prisma migrate dev --name init
    ```

### Na pasta frontend

1. **Instale as dependências:**

    ```bash
    cd frontend
    npm install
    ```

### Configuração do Banco de Dados

Para configurar a conexão com o banco de dados PostgreSQL, siga os passos abaixo:

1. **Instale o PostgreSQL: Certifique-se de ter o PostgreSQL instalado localmente ou em um servidor acessível.**

2. **Crie um Banco de Dados: Crie um banco de dados vazio no PostgreSQL que será usado pela EasyTask.**

3. **Configure o Arquivo .env na pasta do backend com as seguintes variáveis de ambiente:**

    ```bash
    DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
    ```

    - Substitua usuario pelo seu nome de usuário do PostgreSQL.
    - Substitua senha pela sua senha do PostgreSQL.
    - Substitua localhost:5432 pelo host e porta do seu banco de dados PostgreSQL, se diferente.
    - Substitua nome_do_banco pelo nome do banco de dados que você criou.


### Para rodar a aplicação:

1. **Na pasta raíz easy-task rode o comando:**

    ```bash
    npm start
    ```

## Ferramentas de Teste

Para garantir a qualidade e a funcionalidade do sistema, foi utilizado as seguintes ferramentas de teste:

- **Jest:** Um framework de testes JavaScript desenvolvido pelo Facebook, com foco em simplicidade.
- **Supertest:** Uma biblioteca que abstrai a complexidade de fazer solicitações HTTP durante os testes de integração. Utilizamos `fastify.inject` para realizar os testes de endpoints da nossa API.

### Como Executar os Testes:

1. **Para executar os testes, utilize os comandos:**

    ```bash
    cd backend
    npm test
    ```
## Uso

### Endpoints da API

#### Autenticação

- **POST /login:** Autentica o usuário e retorna um token JWT.
  - Body: `{ "username": "admin", "password": "admin" }`

- **POST /register:** Registra um novo usuário.
  - Body: `{ "username_cad": "novo_usuario", "password_cad": "nova_senha" }`

#### Tarefas

- **GET /todos:** Retorna todas as tarefas do usuário autenticado.
  - Header: `Authorization: Bearer <token>`
- **POST /cadastrar/todo:** Cria uma nova tarefa.
  - Body: `{ "text": "Minha tarefa", "category": "Trabalho" }`
  - Header: `Authorization: Bearer <token>`
- **PUT /alterar/todo/:id:** Atualiza o status de conclusão de uma tarefa.
  - Body: `{ "isCompleted": true }`
  - Header: `Authorization: Bearer <token>`
- **DELETE /deletar/todo/:id:** Deleta uma tarefa.
  - Header: `Authorization: Bearer <token>`

## Notas Adicionais

- **Adicionar Tarefa:** Preencha o título e selecione uma categoria para criar uma nova tarefa.
- **Visualizar Tarefas:** Use a barra de pesquisa e os filtros para gerenciar a visualização das tarefas.
- **Completar/Desfazer Tarefa:** Clique no botão "Completar" para marcar uma tarefa como completa ou "Desfazer" para marcá-la como incompleta.
- **Deletar Tarefa:** Clique no botão "X" para deletar uma tarefa.

## Contato

- Email: [andrenegreirosmoreira@gmail.com](mailto:andrenegreirosmoreira@gmail.com)
- GitHub: [Andrengr0](https://github.com/Andrengr0)

 
