import "reflect-metadata"
import bodyParser from 'body-parser';
import express from 'express'
import cors from 'cors';
import router from './shared/routes';

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(router)

export default app;