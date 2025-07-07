import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import instanceMongodb from '~/configs/mongodb.config'
import env, { MODE_ENV } from '~/configs/env.config'
import { API_ROUTE_V1 } from '~/routes/v1'

const app = express()
const port = env.app.port

// init middlewares
app.use(morgan(MODE_ENV))
app.use(helmet())
app.use(express.json())

// init db
instanceMongodb

// init routes
app.use('/api/v1', API_ROUTE_V1)

app.listen(port, () => {
  console.log(`Hello Dat Dev, I am running at PORT:${port}`)
})
