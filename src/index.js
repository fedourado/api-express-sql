//Importando express, pg e dotenv com dados do BD
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
require('dotenv').config()

// Declarou a constante da porta
const PORT = process.env.PORT || 3333

//Conectando com o BD
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

const app = express()

app.use(express.json())
app.user(cors())

// CRIAÇÃO ROTA USER
// GET - Leitura de dados geral
app.get('/', (req, res) => (console.log('Olá!')))
app.get('/users', async (req, res) => {

    // Lê os dados do banco e mostra na pag '/users'
    // Tem que colocar o SELECT[...] como se es tivesse escrevendo no SQL
        try {
        const { rows } = await pool.query('SELECT * FROM users')
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// POST - Criação de dados
app.post('/session', async (req, res) => {
    const { username } = req.body
    let user = ''
    // Tem que colocar o INSERT e para o valor não ser um só, utiliza $1, onde esse valor estará
    // em um array com a const username criada
    try {
        // verifica se já tem alguém com esse user, caso tiver retorna o user 
        user = await pool.query('SELECT * FROM users WHERE user_name = ($1)', [username])
        if (!user.rows[0]){
            user = await pool.query('INSERT INTO users(user_name) VALUES ($1) RETURNING *', [username])
        }
        return res.status(200).send(user.rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// CRIAÇÃO DAS ROTAS TO-DO
// POST - Criação de dados em um id específico
app.post('/todo/:user_id', async (req, res) => {
    const { description, done } = req.body
    const { user_id } = req.params
    try {
        const newTodo = await pool.query('INSERT INTO todos (todo_description, todo_done, user_id) VALUES ($1, $2, $3) RETURNING *', [description, done, user_id])
        return res.status(200).send(newTodo.rows)
    }catch(err) {
        return res.status(400).send(err)
    }
})

// GET - Leitura de dados de um id específico
app.get('/todo/:user_id', async (req, res) => {
    const { user_id } = req.params
    try {
        const allTodos = await pool.query('SELECT * FROM todos WHERE user_id = ($1)', [user_id])
        return res.status(200).send(allTodos.rows)
    }catch(err) {
        return res.status(400).send(err)
    }
})

// PATCH - Atualização de um dados específico
// obs: para não dar erro é preciso mandar todo os dados, descrição e done
// Foi feita uma verificação para saber se o id_todo pertece a o user e se não envia um erro
app.patch('/todo/:user_id/:todo_id', async (req, res) => {
    const { todo_id, user_id } = req.params
    const data = req.body
    try {
        // SEMPRE utilizar o WHERE quando for um user ou algo específico, caso n faça isso
        // ele irá atualizar tudo
        const belongsToUser = await pool.query('SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)', [user_id, todo_id])
        if (!belongsToUser.rows[0]) return res.status(400).send('Operation not allowed')
        const updatedTodo = await pool.query('UPDATE todos SET todo_description = ($1), todo_done = ($2) WHERE todo_id = ($3) RETURNING *',
        [data.description, data.done, todo_id])
        return res.status(200).send(updatedTodo.rows)
    }catch(err){
        return res.status(400).send(err)
    }
})

// DELETE - Deletar um todo específico de um user específico
app.delete('/todo/:user_id/:todo_id', async (req, res) => {
    const { user_id, todo_id } = req.params
    try {
        const belongsToUser = await pool.query('SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)', [user_id, todo_id])
        if (!belongsToUser.rows[0]) return res.status(400).send('Operation not allowed')
        // SEMPRE utilizar o WHERE quando for um user ou algo específico, caso n faça isso
        // ele irá deletar tudo
        const deletedTodo = await pool.query('DELETE FROM todos WHERE todo_id = ($1) RETURNING *', [todo_id])
        return res.status(200).send({
            message: 'To-do successfully deleted!', 
            deletedTodo: deletedTodo.rows
        })
    }catch(err) {
        return res.status(400).send(err)
    }
})


// Outra maneira de abrir um server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
