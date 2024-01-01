import Router from 'express'
import { ensureAuthenticate } from '../middlewares/auth'
import { ProductController } from '../../modules/product/controllers/product.controller'

const productRoutes = Router()

const productController = new ProductController()

productRoutes.post('/', ensureAuthenticate , productController.create)
productRoutes.get('/', ensureAuthenticate , productController.list)
productRoutes.put('/:id', ensureAuthenticate , productController.update)
productRoutes.get('/:id', ensureAuthenticate , productController.findProduct)
productRoutes.delete('/:id', ensureAuthenticate , productController.removeProduct)

export default productRoutes