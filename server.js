const express = require('express');

const app = express();

// importar rotas
const authRouter = require('./routes/auth');

//middlewares
app.use('/api/', authRouter);

const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Api rodando na porta ${port}`));