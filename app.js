const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info("Connecting to MongoDB...");

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch((err) => {
        logger.error(`Fail to connect to MongoDB. Error: ${err.message}`)
    });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users',userRouter);
app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler)

module.exports = app;
