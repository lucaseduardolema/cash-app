##  Desafio

Trata-se de uma aplicação web **fullstack**, *dockerizada* cujo objetivo seja possibilitar que consigam realizar transferências internas entre si.

## Tecnologias e ferramentas usadas

  * Back-end
    - Node.js
    - Express
    - TypeScript
    - Sequelize
    - JWT
    - Joi
    - Bcrypt
    - Cors
    - Express Async Errors
    - Dotenv
    - Swagger

  * Front-end
    - JavaScript
    - React.js
    - Axios
    - React Router
    - Bootstrap
    - React-Bootstrap

  * Database
    - PostgreSQL
    - Adminer

## Instruções

**Importante as portas _`front-end: 3000`_, _`back-end: 3001`_, _`database: 5432`_, _`adminer: 8080`_ devem estar livres para o funcionamento do projeto**

1. Rode os serviços:
  * `docker-compose up --build`
    - Obs: Esse processo pode demorar

2. Acesse as rotas:
  * Front-end: `http://localhost:3000`
    - Página inicial do projeto

  * Back-end: `http://localhost:3001/api-docs`
    - Documentação da API

  * Database: `http://localhost:8080`
    - Gerenciamento gráfico do banco de dados
    - Credenciais:
      - Sistema: `PostgreSQL`
      - Servidor: `db`
      - Usuário: `root`
      - Senha: `123456`
      - Base de dados: `NG_DB`