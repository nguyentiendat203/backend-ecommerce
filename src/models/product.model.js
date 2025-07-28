import mongoose, { Schema } from 'mongoose'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

var productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_price: { type: Number, require: true },
    product_quantity: { type: Number, require: true },
    product_type: {
      type: String,
      require: true,
      enum: ['Electronics', 'Clothes']
    },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, require: true }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

var electronicSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
  },
  {
    timestamps: true,
    collection: 'Electronics'
  }
)

var clothingSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
  },
  {
    timestamps: true,
    collection: 'Clothes'
  }
)

export const productModel = mongoose.model(DOCUMENT_NAME, productSchema)
export const electronicModel = mongoose.model('Electronic', electronicSchema)
export const clothingModel = mongoose.model('Clothing', clothingSchema)
