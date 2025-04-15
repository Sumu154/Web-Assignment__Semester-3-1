const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');


const app = express();

app.set('View engine', 'ejs');
app.use(cors({
  origin: [
    'http://localhost:5173',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('hello.....assignment hbe ki?')
})

app.listen(port, () => {
  console.log(`server is running at port ${port} `)
})