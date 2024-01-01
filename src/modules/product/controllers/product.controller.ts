import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { HttpStatus } from "../../../shared/utils/enums";
import { retSuccess, retSuccessBody } from "../../../shared/utils/response";
import handleError from "../../../shared/utils/errorHandling";
import { shemaProduct } from "../schemas/product.shema";

export class ProductController {

    async create(request: Request, response: Response) {

        try {

            await shemaProduct.validate(request.body)

            const product = await productService.create({ ...request.body, id_account: request.account })
            
            return response.status(HttpStatus.CREATED).json(retSuccessBody('Produto criado com sucesso', product))

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async list(request: Request, response: Response) {

        try {

            const query = request.query

            const products = await productService.list(query, request.account)
            
            return response.status(HttpStatus.OK).json(products)

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async update(request: Request, response: Response) {

        try {
            
            const { id } = request.params

            const productUpdated = await productService.update(Number(id), request.body, request.account)
            
            return response.status(HttpStatus.OK).json(retSuccessBody('Produto atualizado com sucesso', productUpdated))

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async findProduct(request: Request, response: Response) {

        try {
            
            const { id } = request.params

            const product = await productService.findById(Number(id), request.account)
            
            return response.status(HttpStatus.OK).json(product)

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async removeProduct(request: Request, response: Response) {

        try {
            
            const { id } = request.params

            await productService.remove(Number(id), request.account)
            
            return response.status(HttpStatus.OK).json(retSuccess('Produto removido com sucesso'))

        } catch (err) {
            handleError(err, request, response)
        }
    }
}