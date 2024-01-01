import { prisma } from "../../../configs/database/prisma-client"
import AppError from "../../../shared/errors/app.error"
import { HttpStatus } from "../../../shared/utils/enums"
import { categoryService } from "../../category/services/category.service"
import { Product, ProductDto, ProductResponse, Query } from "../types/product"

class ProductService {

    private query() {
        return prisma.product
    }

    async create(productDto: ProductDto): Promise<Product> {

        if (productDto.id_category) {
            console.log(productDto.id_category)
            await categoryService.findById(productDto.id_category, productDto.id_account)
        }

        const product = await this.query().create({
            data: productDto
        })

        return product

    }

    async list(query: Query, account: number): Promise<ProductResponse[]> {

        const limit = Number(query.limit) || 10

        const page = Number(query.page) || 1

        const products = await this.query().findMany({
            where: {
                id_account: account,
                name: {
                    mode: 'insensitive',
                    contains: query.name
                }
            },
            select: {
                id: true,
                name: true,
                stock: true,
                value: true,
                obs: true,
                created_at: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            take: limit,
            skip: (page - 1) * limit
        })

        return products

    }

    async update(id: number, productDto: ProductDto, account: number): Promise<Product> {

        await this.findById(id, account)

        const productUpdated = this.query().update({
            where: { id, id_account: account },
            data: productDto
        })

        return productUpdated

    }

    async findById(id: number, account: number): Promise<ProductResponse | null> {

        const product = await this.query().findFirst({
            where: { id, id_account: account },
            select: {
                id: true,
                name: true,
                stock: true,
                value: true,
                obs: true,
                created_at: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
        })

        if (!product) {
            throw new AppError(HttpStatus.NOT_FOUND, `Produto de id: ${id} não foi encontrado`)
        }

        return product

    }

    async remove(id: number, account: number): Promise<void> {

        await this.findById(id, account)

        await this.query().delete({
            where: { id, id_account: account }
        })

    }

}

export const productService = new ProductService()