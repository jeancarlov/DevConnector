const express = require('express');
const connectDB = require ('./config/db');
 
const app = express();

// Connect database

connectDB();

// Init Middleware this should allow to get data from req.body, note that bodyParser is not needed since it comes with express
app.use(express.json({ extended: false}));

app.get('/',(req, res) => res.send (`API Running`));

// Define Routes
app.use('/api/user', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
