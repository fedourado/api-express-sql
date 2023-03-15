# API NODE.JS COM FRAMEWORK
API teste criada com a utilização de Node.js, framework Express.js e o banco de dados Postgres. 
O projeto foi baseado no vídeo "API REST NodeJS em menos de 1h: Todo app com Express e Postgres (SQL) - deploy no Heroku" 
do canal Dev & Design como parte de um projeto pessoal para o estudo de criação de API.

&nbsp;

## :card_index_dividers: Banco de Dados
Foi utilizado o ElephantSQL para a realização dessa API. Para utilizá-lo siga as instruções:

1. Crie uma conta no [ElephantSQL](https://www.elephantsql.com/);
2. Configure o Banco de dados;
3. Crie as tabelas `users` e `todos`.

&nbsp;

## ⚙️ Configuração
Para usar a API, você precisa ter o Node.js instalado em seu sistema. Depois de instalados, siga os seguintes passos:

1. Clone o repositório para sua máquina local;
2. Abra o terminal e navegue até o diretório do projeto;
3. Execute o comando `npm install` para instalar as dependências;
4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:
```
POSTGRES_URL = <a url disponibilizada no ElephantSQL>
```
6. Execute o comando `npm dev` para iniciar a API.

* OBS: Para encontrar a URL no site do ElephantSQL é preciso clicar na instância criada e ir em `Datails`.
 
&nbsp;
 
## 📌 Endpoints
A API possui os seguintes endpoints:

### GET /users
* Retorna todos os usuários.

### GET /todo/:user_id
* Retorna os dados (to-do) de um id específico.

### POST /session
* Cria uma sessão para um user.

### POST /todo/:user_id
* Cria um to-do em um id específico.

### PATCH /todo/:user_id/:todo_id
* Atualiza um dado específico (to-do específico) de um user também específico.

### DELETE /todo/:user_id/:todo_id
* Remove um dado específico (to-do específico) de um user também específico.

&nbsp;

## :film_strip: Vídeo - API REST NodeJS em menos de 1h: Todo app com Express e Postgres (SQL) - deploy no Heroku
Vídeo utilizado como suporte para a criação da API.

* https://www.youtube.com/watch?v=8T8YmSHZ3fg
 
&nbsp;

## 🛠️ Construído com
As ferramentas utilizadas para a criação dessa API:

* Express - Framework utilizada para a criação da API
* [Insomnia](https://insomnia.rest/download) -  é uma ferramenta Open Source para desenvolvimento/teste de API Clients
* [ElephantSQL](https://www.elephantsql.com/) - Banco de dados
