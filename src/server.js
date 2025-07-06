import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import instanceMongodb from '~/configs/mongodb.config'
import env, { MODE_ENV } from '~/configs/env.config'

const app = express()
const port = env.app.port

// init middlewares
app.use(morgan(MODE_ENV))
app.use(helmet())

// init db
instanceMongodb

// init routes
app.get('/', (req, res) => {
  res.end('<h1>Hello World!</h1><hr>')
})

app.listen(port, () => {
  console.log(`Hello Dat Dev, I am running at PORT:${port}`)
})
