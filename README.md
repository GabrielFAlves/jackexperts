# Gerenciamento de Tarefas com Autenticação JWT

Este projeto é uma aplicação web para gerenciamento de tarefas, onde cada usuário pode criar, visualizar, atualizar e deletar apenas as suas próprias tarefas. A aplicação utiliza Node.js no backend, React no frontend e JWT (JSON Web Tokens) para autenticação. O objetivo é fornecer uma interface segura e eficiente para gerenciar tarefas de forma individualizada.

## Tecnologias Utilizadas

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, MySQL, JWT, CORS
- **Banco de Dados**: MySQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Gerenciamento de Estado**: React Context API

## Estrutura do Projeto

- **Backend (`/back-end`)**: API RESTful criada com Node.js e Express para gerenciar autenticação e operações de tarefas.
- **Frontend (`/front-end`)**: Aplicação React que interage com o backend e apresenta a interface de usuário.
- **Banco de Dados**: MySQL usado para armazenar usuários e tarefas.

## Funcionalidades

- **Autenticação de Usuário**: Login e registro com validação de credenciais.
- **Gerenciamento de Tarefas**: Criação, visualização, edição e exclusão de tarefas, restritas ao usuário autenticado.
- **Proteção de Rotas**: Apenas usuários autenticados podem acessar as funcionalidades de tarefas.
- **Persistência de Sessão**: Armazenamento do token JWT no `localStorage` do navegador.

## Decisões Técnicas

1. **JWT para Autenticação**: Utilizado para garantir que apenas usuários autenticados acessem suas próprias tarefas. É uma solução eficiente e segura para aplicações web que precisam gerenciar autenticação sem armazenar estado no servidor.

2. **React Context API para Gerenciamento de Estado**: Escolhido para centralizar a lógica de autenticação e facilitar o compartilhamento de estado entre componentes, como o login e logout.

3. **CORS**: Configurado no backend para permitir a comunicação entre o frontend (rodando em uma porta diferente) e o backend. Foi configurado para aceitar requisições da origem específica do frontend, garantindo segurança nas requisições.

4. **MySQL como Banco de Dados**: Escolhido por sua robustez e suporte a consultas relacionais. Cada tarefa é associada a um `user_id` para garantir que apenas o dono possa visualizá-la ou modificá-la.

5. **Segurança**: Todas as operações de CRUD de tarefas verificam o `user_id` para garantir que o usuário autenticado só possa manipular suas próprias tarefas.

## Configuração do Projeto

### Pré-requisitos

- Node.js instalado (versão 14+ recomendada)
- MySQL instalado e configurado

### Passo a Passo para Rodar o Projeto

#### 1. Clone o Repositório

```bash
git clone https://github.com/GabrielFAlves/jackexperts.git
cd jackexperts
```

#### 2. Navegue até a pasta do backend

```bash
cd back-end
```

#### 3. Instale as dependências

```bash
npm install
```

#### 4. Crie um arquivo .env com as seguintes configurações

```bash
PORT=3333
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=todolist

JWT_SECRET=U3lJk9/W9+d7KxEGr7H9a4A6R5Ix6GrdAt+9+hRfdhI=
```

#### 5. Configuração do Banco de Dados MySQL

1. Acesse seu MySQL e crie o banco de dados `todolist` com as tabelas `users` e `tasks` usando o seguinte script SQL:

    ```sql
    -- Cria o banco de dados
    CREATE DATABASE todolist;

    -- Usa o banco de dados
    USE todolist;

    -- Cria a tabela users
    CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at VARCHAR(255) NOT NULL
    );

    -- Cria a tabela tasks
    CREATE TABLE tasks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(45) NOT NULL,
        created_at VARCHAR(45) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    ```

2. Após executar o script, o banco de dados `todolist` estará configurado com as tabelas `users` e `tasks` prontas para uso.

#### 6. Inicie o servidor backend

```bash
npm start
```

#### 7. Configuração do Frontend

```bash
cd front-end
```

#### 8. Instale as dependências

```bash
npm install
```

#### 9. Inicie o servidor frontend

```bash
npm start
```

## Uso

1. Acesse [http://localhost:5173](http://localhost:5173) no seu navegador.
2. Registre um novo usuário ou faça login com suas credenciais.
3. Gerencie suas tarefas: crie, edite e exclua conforme necessário. As tarefas são privadas e visíveis apenas para o usuário que as criou.
