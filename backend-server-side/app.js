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


// import all the routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes')

app.use('/api', userRoutes)
app.use('/api', taskRoutes);


app.get('/', (req, res) => {
  res.send('hello.....kire assignment hbe?')
})

app.listen(port, () => {
  console.log(`server is running at port ${port} `)
})