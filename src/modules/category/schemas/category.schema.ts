import {object,string} from 'yup'

export const shemaCategory = object().shape({
    name: string().required('Nome é um campo obrigatório')
})