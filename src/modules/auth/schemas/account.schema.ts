import {object,string} from 'yup'

export const schemaCreateAccount = object().shape({
    email: string().required('E-mail is required').email(),
    password: string().required('Password is required')
})