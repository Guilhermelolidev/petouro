
export interface Product {
    id: number
    name: string
    stock: number | null
    value: any
    active: boolean
    obs: string | null
    id_account: number
    id_category: number | null
    created_at: Date
}

export interface ProductDto {
    name: string
    stock?: number
    value: number
    obs?: string
    id_account: number
    id_category: number | null
}

export interface Query {
    name?: string
    limit?: number
    page?: number
}

export interface ProductResponse {
    name: string
    stock: number | null
    value: any
    obs: string | null
    created_at: Date
}