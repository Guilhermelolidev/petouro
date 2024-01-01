import Router from 'express'
import { ClientController } from '../../modules/client/controllers/client.controller'
import { ensureAuthenticate } from '../middlewares/auth'

const clientRoutes = Router()

const clientController = new ClientController()

clientRoutes.post('/', ensureAuthenticate, clientController.create)
clientRoutes.patch('/:id', ensureAuthenticate, clientController.activeClient)
clientRoutes.delete('/:id', ensureAuthenticate, clientController.remove)
clientRoutes.get('/:id', ensureAuthenticate, clientController.getClient)
clientRoutes.put('/:id', ensureAuthenticate, clientController.updateClient)
clientRoutes.get('/', ensureAuthenticate, clientController.list)

export default clientRoutes