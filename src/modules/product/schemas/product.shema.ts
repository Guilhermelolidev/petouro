import {object,string} from 'yup'

export const shemaProduct = object().shape({
    name: string().required('Nome é um campo obrigatório'),
    value: string().required('Valor é um campo obrigatório')
})