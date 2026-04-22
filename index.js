const express = require('express');
const dotenv= require('dotenv');
const connectDB = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes.js');
const taskRoutes = require('./src/routes/taskRoutes.js');
const errorMiddleware = require('./src/middleware/errorMiddleware.js');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerspec = require('./src/config/swagger.js');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
connectDB();

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerspec));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
}));
app.use(helmet());
app.use(cors());

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('App running!');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});