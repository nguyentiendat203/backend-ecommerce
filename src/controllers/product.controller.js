import { StatusCodes } from 'http-status-codes'
import ApiSuccess from '~/helpers/ApiSuccess.helper'
import { ProductService } from '~/services/product.service'

class ProductController {
  createProduct = async (req, res, next) => {
    new ApiSuccess({
      statusCode: StatusCodes.CREATED,
      metadata: await ProductService.createProduct(req.body.product_type, { ...req.body, product_shop: req.user._id })
    }).sendResponse(res)
  }
}

export default new ProductController()
