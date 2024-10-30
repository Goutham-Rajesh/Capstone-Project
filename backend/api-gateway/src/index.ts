import express from 'express';
import router from './routes/serviceRoutes'

const app=express()


app.use(router)



app.listen()