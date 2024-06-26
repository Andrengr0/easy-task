# EasyTask

EasyTask é uma aplicação de gerenciamento de tarefas simples e eficiente. Com EasyTask, você pode criar, visualizar, completar e deletar suas tarefas diárias. A aplicação inclui autenticação de usuário e está dividida em front-end e back-end. O front-end é desenvolvido usando React com Vite, e o back-end é construído com Fastify, Prisma e banco de dados PostgreSQL.

## Funcionalidades

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

3. **Migrate o banco de dados:**

    ```bash
    npx prisma migrate dev --name init
    ```

### Na pasta frontend

1. **Instale as dependências:**

    ```bash
    cd frontend
    npm install
    ```

### Para rodar a aplicação:

1. **Na pasta raíz easy-task rode o comando:**

    ```bash
    npm start
    ```

### Para rodar os testes no backend:

1. **Na pasta raíz easy-task entre na pasta backend:**

    ```bash
    cd backend
    ```

2. **Na pasta backend rode o comando:**

    ```bash
    npm test
    ```

## Uso

### Endpoints da API

#### Autenticação

- **POST /login:** Autentica o usuário e retorna um token JWT.
  - Body: `{ "username": "admin", "password": "admin" }`

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

- **Login:** Utilize 'admin' como nome de usuário e senha para realizar login.
- **Adicionar Tarefa:** Preencha o título e selecione uma categoria para criar uma nova tarefa.
- **Visualizar Tarefas:** Use a barra de pesquisa e os filtros para gerenciar a visualização das tarefas.
- **Completar/Desfazer Tarefa:** Clique no botão "Completar" para marcar uma tarefa como completa ou "Desfazer" para marcá-la como incompleta.
- **Deletar Tarefa:** Clique no botão "X" para deletar uma tarefa.

## Contato

- Email: [andrenegreirosmoreira@gmail.com](mailto:andrenegreirosmoreira@gmail.com)
- GitHub: [Andrengr0](https://github.com/Andrengr0)

 
