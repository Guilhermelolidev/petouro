import Router from 'express'
import { AnimalController } from '../../modules/animal/controllers/animal.controller'
import { ensureAuthenticate } from '../middlewares/auth'

const animalRoutes = Router()

const animalController = new AnimalController()

animalRoutes.post('/', ensureAuthenticate, animalController.create)
animalRoutes.get('/', ensureAuthenticate, animalController.list)
animalRoutes.delete('/:id', ensureAuthenticate, animalController.removeAnimal)
animalRoutes.get('/:id', ensureAuthenticate, animalController.findAnimal)
animalRoutes.put('/:id', ensureAuthenticate, animalController.updateAnimal)

export default animalRoutes