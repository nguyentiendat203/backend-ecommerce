import mongoose from 'mongoose'
import env from './env.config'

const mongodbURI = `mongodb://${env.db.user}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.name}`
class Database {
  // static instance = null

  constructor() {
    this.connect()
  }

  connect() {
    mongoose
      .connect(mongodbURI, { maxPoolSize: 50 })
      .then(() => {
        console.log('Connect Mongodb Successfully')
      })
      .catch((err) => {
        console.log('Something errors!')
      })
  }

  //  Dùng static method để có thể gọi hàm mà ko cần phải khởi tạo đối tượng (hay tạo 1 instance)
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
