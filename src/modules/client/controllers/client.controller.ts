import { Request,Response } from "express";
import { clientService } from "../services/client.service";
import { HttpStatus } from "../../../shared/utils/enums";
import { shemaCreateClient } from "../schemas/client.shema";
import handleError from "../../../shared/utils/errorHandling";
import { retSuccess, retSuccessBody } from "../../../shared/utils/response";

export class ClientController {

    async create(request: Request, response: Response) {

        try {

            await shemaCreateClient.validate(request.body)

            const client = await clientService.create(request.body, request.account)

            return response.status(HttpStatus.CREATED).json(client)

        } catch (err: unknown) {
            handleError(err, request, response)
        }

    }

    async updateClient(request: Request, response: Response) {

        try {

            await shemaCreateClient.validate(request.body)
            
            const {id} = request.params

            const clientUpdated = await clientService.update(parseInt(id), request.body, request.account)

            return response.status(HttpStatus.OK).json(retSuccessBody('Cliente atualizado com sucesso', clientUpdated))

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async list(request: Request, response: Response) {

        try {
            const query = request.query

            const clients = await clientService.findAll(query, request.account)

            return response.status(HttpStatus.OK).json(clients)

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async getClient(request: Request, response: Response) {

        try {
            const {id} = request.params

            const client = await clientService.findById(parseInt(id), request.account)

            return response.status(HttpStatus.OK).json(retSuccessBody('Cliente recuperado com sucesso', client))

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async remove(request: Request, response: Response) {

        try {
            const {id} = request.params

            await clientService.remove(parseInt(id), request.account)

            return response.status(HttpStatus.OK).json(retSuccess('Cliente removido com sucesso'))

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async activeClient(request: Request, response: Response) {

        try {
            const {id} = request.params

            await clientService.activeClient(parseInt(id), request.account)

            return response.status(HttpStatus.OK).json(retSuccess('Cliente alterado com sucesso'))
            
        } catch (err) {
            handleError(err, request, response)
        }
    }
}
