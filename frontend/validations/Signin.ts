import * as Yup from 'yup';


export const signInSchema = Yup.object().shape({

    email: Yup.string().required().email('wrong email'),
    password: Yup.string().required().min(6,"min 6 characters" ).max(20,'max 20 characters')
})

export type SignInFormdata = Yup.InferType<typeof signInSchema>