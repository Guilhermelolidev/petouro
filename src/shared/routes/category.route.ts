import Router from 'express'
import { CategoryController } from '../../modules/category/controllers/category.controller'
import { ensureAuthenticate } from '../middlewares/auth'

const categoryRoute = Router()

const categoryController = new CategoryController()

categoryRoute.post('/', ensureAuthenticate , categoryController.create)
categoryRoute.delete('/:id', ensureAuthenticate, categoryController.remove)
categoryRoute.get('/', ensureAuthenticate, categoryController.list)
categoryRoute.get('/:id', ensureAuthenticate, categoryController.findCategory)
categoryRoute.put('/:id', ensureAuthenticate, categoryController.updateCategory)

export default categoryRoute