import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()


db.authenticate()
  .then( () => console.log('base conectada'))
  .catch( error => console.log(error))


const host = process.env.HOST  || '0.0.0.0'
const port = process.env.PORT  || 4000


app.set('view engine', 'pug')

app.use((req, res, next) => {
  const year = new Date()

  res.locals.actualYear = year.getFullYear()
  res.locals.nombreSitio = 'Agencia de viajes'

  return next()
})

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.use('/', router)

app.listen(port, host, () => {
  console.log('El servidor esta encendido y funcionando');
})
