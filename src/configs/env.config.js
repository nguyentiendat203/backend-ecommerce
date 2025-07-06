import 'dotenv/config'

const dev = {
  app: {
    port: process.env.LOCAL_DEV_APP_PORT
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  }
}

const pro = {
  app: {
    port: process.env.PRODUCTION_APP_PORT
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || 'db-pro'
  }
}

const env = { dev, pro }
export const MODE_ENV = process.env.NODE_ENV || 'dev'
export default env[MODE_ENV]
