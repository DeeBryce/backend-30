const express = require('express');
const dotenv= require('dotenv');
const connectDB = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('App running!');
});

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});