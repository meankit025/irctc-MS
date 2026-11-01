const express = require('express');
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const logger = require('./config/logger');
const { config } = require('./config');

const {reqLogger} = require('./middlewares/req.middleware');
const {corsMiddleware} = require('./middlewares/cors.middleware')
const errorHandler = require('./middlewares/error.middleware')
const app = express()

app.use(helmet())
app.use(corsMiddleware)
app.use(reqLogger);
app.use(cookieParser())
app.use(express.json())

app.get('/',(req,res) => {
    res.send('Hello from index.js of user service')
})

app.get('/health', (req,res) => {
    res.status(200).json({
        message: 'OK'
    })
})

app.use(errorHandler)

const startServer = async() => {
    try{
        const server = app.listen(4001, () => {
           logger.info(`${config.SERVICE_NAME} is running on http://localhost:${config.PORT}`) 
        })
    } catch(error) {
        logger.error('Failed to start server', error)
        process.exit(1)
    }
}

startServer()