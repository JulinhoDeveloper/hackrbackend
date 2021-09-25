const express = require('express');

const morgan = require('morgan');
const bodyParser  = require('body-parser');
const cors  = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//DB
mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => 
console.log('conectado')).catch(err => console.log(err));


// importar rotas
const authRouter = require('./routes/auth');


//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL })); 

//middlewares
app.use('/api/', authRouter);

const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Api rodando na porta ${port}`));