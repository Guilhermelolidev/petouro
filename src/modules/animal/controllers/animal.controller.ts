import { Request, Response } from "express";
import handleError from "../../../shared/utils/errorHandling";
import { schemaAnimal } from "../schemas/animal.schema";
import { animalService } from "../services/animal.service";
import { HttpStatus } from "../../../shared/utils/enums";
import { retSuccess, retSuccessBody } from "../../../shared/utils/response";

export class AnimalController {

    async create(request: Request, response: Response) {

        try {

            await schemaAnimal.validate(request.body)

            const animal = await animalService.create(request.body, request.account)

            return response.status(HttpStatus.CREATED).json(retSuccessBody('Pet criado com sucesso', animal))

        } catch (err) {
            console.log(err)
            handleError(err, request, response)
        }

    }

    async list(request: Request, response: Response) {

        try {

            const query = request.query

            const animals = await animalService.list(query, request.account)

            return response.status(HttpStatus.OK).json(animals)

        } catch (err) {
            handleError(err, request, response)
        }

    }

    async findAnimal(request: Request, response: Response) {

        try {

            const { id } = request.params

            const animal = await animalService.findById(Number(id), request.account)

            return response.status(HttpStatus.OK).json(retSuccessBody('Animal encontrado com sucesso', animal))

        } catch (err) {
            handleError(err, request, response)
        }

    }

    async updateAnimal(request: Request, response: Response) {

        try {

            const { id } = request.params

            const animalUpdated = await animalService.update(Number(id), request.body, request.account)

            return response.status(HttpStatus.OK).json(retSuccessBody('Animal atualizado com sucesso', animalUpdated))

        } catch (err) {
            console.log(err)
            handleError(err, request, response)
        }

    }

    async removeAnimal(request: Request, response: Response) {

        try {

            const { id } = request.params

            await animalService.remove(Number(id), request.account)

            return response.status(HttpStatus.OK).json(retSuccess('Pet removido com sucesso'))

        } catch (err) {
            handleError(err, request, response)
        }

    }
}