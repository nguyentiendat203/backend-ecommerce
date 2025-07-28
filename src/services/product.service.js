import { StatusCodes } from 'http-status-codes'
import ApiError from '~/helpers/ApiError.helper'
import { clothingModel, electronicModel, productModel } from '~/models/product.model'

const productFactory = {
  Electronics: Electronic,
  Clothes: Clothing
}

export class ProductService {
  static createProduct = async (type, payload) => {
    const ProductClass = productFactory[type]
    if (!ProductClass) throw new ApiError('Invalid Product', StatusCodes.BAD_REQUEST)

    const instance = new ProductClass(payload)

    return await instance.create()
  }
}

class Product {
  constructor({ product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes }) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
  }

  async create(product_id) {
    return await productModel.create({ ...this, _id: product_id })
  }
}

class Clothing extends Product {
  async create() {
    const newClothes = await clothingModel.create({ ...this.product_attributes, product_shop: this.product_shop })
    if (!newClothes) throw new ApiError('Create new clothing error', StatusCodes.BAD_REQUEST)
    return await super.create(newClothes._id)
  }
}

class Electronic extends Product {
  async create() {
    const newElecs = await electronicModel.create({ ...this.product_attributes, product_shop: this.product_shop })
    return await super.create(newElecs._id)
  }
}
