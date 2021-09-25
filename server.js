const express = require('express');

const morgan = require('morgan');
const bodyParser  = require('body-parser');
const cors  = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// importar rotas
const authRouter = require('./routes/auth');
const { json } = require('body-parser');

//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); 

//middlewares
app.use('/api/', authRouter);

const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Api rodando na porta ${port}`));