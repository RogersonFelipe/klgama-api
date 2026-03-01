# KL Gama - Sistema de Demandas

Sistema de gerenciamento de demandas com autenticação JWT e isolamento multi-tenant.

## Estrutura do Projeto

```
klgama-api/          # Backend Node.js + Express
klgama-web/          # Frontend Vue 3 + Quasar
README.md
```

## Requisitos

- Node.js v18+
- npm
- Conta Supabase com banco de dados PostgreSQL

## Setup do Backend

1. Navegue até a pasta klgama-api:

```bash
cd klgama-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-api
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRATION=24h
NODE_ENV=development
PORT=3000
```

4. Execute a seed para popular o banco:

```bash
npm run seed
```

5. Inicie o servidor:

```bash
npm run dev
```

O servidor rodara em http://localhost:3000

## Setup do Frontend

1. Em outra janela de terminal, navegue até klgama-web:

```bash
cd klgama-web
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend rodara em http://localhost:9000 ou http://localhost:5173

## Usando a Aplicacao

1. Acesse http://localhost:9000 (ou a porta indicada)

2. Faça login com as credenciais padrão:
   - Email: admin@techsolutions.com
   - Senha: senha123

3. Navegue pelo menu para acessar:
   - Dashboard
   - Clientes
   - Usuarios
   - Demandas

## Credenciais de Teste

As credenciais abaixo foram criadas pela seed:

Cliente: Tech Solutions

- Email: admin@techsolutions.com
- Senha: senha123

Cliente: Digital Agency

- Email: admin@digitalagency.com
- Senha: senha123

## Estrutura de Pastas Backend

src/

- config/ # Configuracao do banco e variaveis
- controllers/ # Recebem requisicoes HTTP
- services/ # Logica de negocio
- repositories/ # Acesso ao banco de dados
- middlewares/ # Autenticacao, validacao, erros
- routes/ # Definicao das rotas
- utils/ # Utilitarios (validadores, responses)

## Endpoints Principais

### Autenticacao

- POST /api/auth/login
- POST /api/auth/registrar
- GET /api/auth/validar

### Clientes

- GET /api/clientes
- GET /api/clientes/:id
- POST /api/clientes
- PUT /api/clientes/:id
- DELETE /api/clientes/:id

### Usuarios

- GET /api/usuarios
- GET /api/usuarios/:id
- POST /api/usuarios
- PUT /api/usuarios/:id
- DELETE /api/usuarios/:id

### Demandas

- GET /api/demandas
- GET /api/demandas/:id
- GET /api/demandas/usuario/:usuario_id
- POST /api/demandas
- PUT /api/demandas/:id
- DELETE /api/demandas/:id

## Tecnologias Utilizadas

Backend:

- Node.js
- Express.js
- PostgreSQL (Supabase)
- JWT para autenticacao
- Bcrypt para hash de senhas
- Joi para validacao

Frontend:

- Vue 3
- Quasar Framework
- Pinia para state management
- Axios para requisicoes HTTP

## Seguranca

- Senhas sao armazenadas com hash bcrypt
- JWT com expiracao configuravel
- Validacao de entrada em todos os endpoints
- Isolamento multi-tenant (acesso cruzado bloqueado)
- Senhas nunca sao retornadas nas respostas

## Decisoes Tecnicas

1. Usos Supabase por ser gerenciado e facil de configurar
2. JWT para autenticacao stateless
3. Arquitetura em camadas (controllers, services, repositories)
4. Pinia para state management simples no frontend
5. Quasar para componentes prontos e responsivos
6. Joi para validacao consistente

## Problemas Conhecidos

Nenhum no momento.

## Proximos Passos

- Implementar CRUD completo no frontend
- Adicionar validacoes mais rigorosas
- Criar testes automatizados
- Implementar paginacao
- Adicionar filtros avancados

## Contato

rogersonfilipi@hotmail.com
