# Gerenciador de Tarefas

## Visão Geral

O **Gerenciador de Tarefas** é uma aplicação web simples que permite aos usuários se registrar, fazer login e gerenciar tarefas. Os usuários podem criar tarefas, marcar como concluídas e excluí-las. A aplicação utiliza **Express** para roteamento, **Prisma** para interações com o banco de dados e **bcryptjs** para criptografia de senhas.

## Funcionalidades

- Registro e login de usuários com criptografia de senha
- Criação, atualização (marcar como concluída) e exclusão de tarefas
- Autenticação de usuários utilizando gerenciamento de sessões
- Banco de dados MySQL para armazenar usuários e tarefas

## Tecnologias Utilizadas

- **Express.js**: Framework web para Node.js
- **Prisma**: ORM para interação com o banco de dados
- **bcryptjs**: Criptografia de senha
- **MySQL**: Banco de dados para armazenar usuários e tarefas
- **EJS**: Motor de templates para renderização de views
- **express-session**: Gerenciamento de sessões para autenticação de usuários

## Estrutura do Projeto

```bash
├── src
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware
│   │   └── auth.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── services
│   │   ├── authService.js
│   │   └── taskService.js
│   └── views
│       ├── content
│       ├── main.ejs
│       └── layout.ejs
├── .env
├── prisma
│   └── schema.prisma
├── package.json
└── README.md
```

## Como Configurar e Instalar

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seunome/gerenciador-de-tarefas.git
   cd gerenciador-de-tarefas
   ```

2. **Instale as dependências**

   Certifique-se de ter o Node.js instalado. Então, instale as dependências:

   ```bash
   npm install
   ```

3. **Configuração do banco de dados**

   Certifique-se de ter o MySQL em execução e crie um arquivo `.env` no diretório raiz com a seguinte configuração:

   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/task_manager"
   ```

   Substitua `usuario`, `senha` e o nome do banco de dados conforme suas credenciais do MySQL.

4. **Rodar as migrações do Prisma**

   Gere o cliente Prisma e execute as migrações:

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie a aplicação**

   Use o seguinte comando para iniciar a aplicação:

   ```bash
   npm start
   ```

   A aplicação estará disponível em `http://localhost:3000`.

## Endpoints

### Rotas de Autenticação

- **GET /login**: Exibe o formulário de login
- **POST /login**: Realiza o login do usuário
- **GET /register**: Exibe o formulário de registro
- **POST /register**: Realiza o registro de um novo usuário
- **GET /logout**: Realiza o logout do usuário e destrói a sessão

### Rotas de Tarefas (Requer Autenticação)

- **GET /tasks**: Lista todas as tarefas do usuário logado
- **POST /tasks**: Cria uma nova tarefa
- **POST /tasks/:id/toggle**: Alterna o status de conclusão de uma tarefa
- **POST /tasks/:id/delete**: Exclui uma tarefa

## Esquema do Banco de Dados

### Usuários

```prisma
model users {
  id       Int     @id @default(autoincrement())
  username String  @unique @db.VarChar(50)
  password String  @db.VarChar(255)
  tasks    tasks[]
}
```

### Tarefas

```prisma
model tasks {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  completed Boolean? @default(false)
  userId    Int?
  users     users?   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Autenticação e Segurança

- As senhas são criptografadas utilizando **bcryptjs** antes de serem armazenadas no banco de dados.
- As sessões de usuários são gerenciadas com **express-session** para manter o controle de usuários autenticados.

## Notas

- Esta aplicação utiliza **MySQL** como banco de dados e o esquema é definido utilizando o **Prisma**.
- Certifique-se de atualizar a string de conexão com o banco de dados no arquivo `.env` antes de rodar a aplicação.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.