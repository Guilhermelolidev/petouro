import { Response, Request} from "express";
import handleError from "../../../shared/utils/errorHandling";
import { Category } from "../types/category";
import { categoryService } from "../services/category.service";
import { HttpStatus } from "../../../shared/utils/enums";
import { retSuccess, retSuccessBody } from "../../../shared/utils/response";
import { shemaCategory } from "../schemas/category.schema";

export class CategoryController {

    async create(request: Request, response: Response) {

        try {

            await shemaCategory.validate(request.body)

            const category = await categoryService.create(request.body, request.account)
            
            return response.status(HttpStatus.CREATED).json(retSuccessBody('Categoria criada com sucesso', category))

        } catch (err) {
            handleError(err, request, response)
        }

    }

    async remove(request: Request, response: Response) {

        try {

            const { id } = request.params

            await categoryService.remove(parseInt(id), request.account)
            
            return response.status(HttpStatus.OK).json(retSuccess('Categoria removida com sucesso'))

        } catch (err) {
            console.log(err)
            handleError(err, request, response)
        }
    }

    async list(request: Request, response: Response) {

        try {

            const categories = await categoryService.list(request.account)
            
            return response.status(HttpStatus.OK).json(categories)

        } catch (err) {
            handleError(err, request, response)
        }

    }

    async updateCategory(request: Request, response: Response) {

        try {
            const { id } = request.params

            const categoryUpdated = await categoryService.update(parseInt(id), request.body, request.account)
            
            return response.status(HttpStatus.OK).json(retSuccessBody('Categoria atualizada com sucesso', categoryUpdated))

        } catch (err) {
            handleError(err, request, response)
        }
    }

    async findCategory(request: Request, response: Response) {

        try {
            const { id } = request.params

            const category = await categoryService.findById(parseInt(id), request.account)
            
            return response.status(HttpStatus.OK).json(category)

        } catch (err) {
            handleError(err, request, response)
        }

    }

}