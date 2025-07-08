import mongoose, { Schema } from 'mongoose'

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'
export const ROLES_SHOP = {
  SHOP: 'SHOP',
  WRITTER: 'WRITTER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

var shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive'
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false
    },
    refreshToken: {
      type: String,
      require: true
    },
    refreshTokensUsed: {
      type: Array,
      default: []
    },
    roels: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const shopModel = mongoose.model(DOCUMENT_NAME, shopSchema)
