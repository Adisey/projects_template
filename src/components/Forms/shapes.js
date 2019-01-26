// Core
import { object, string, boolean } from 'yup';

const max50 = `Не белее 50 символов !`;
const min5 = `Минимум 5 символов !`;
const isRequired = `Поле не должно быть пустым !`;

// Instruments
export const login = {
    shape: {
        email:    'as@g.mail',
        password: '123456',
        remember: false,
    },
    schema: object().shape({
        email: string()
            .email()
            .required(isRequired)
            .max(50, max50),
        password: string()
            .min(5, min5)
            .required(isRequired),
        remember: boolean(),
    }),
};

export const signup = {
    shape: {
        firstName: 'Aaa',
        lastName:  'Sss',
        email:     'as@g.mail',
        password:  '123456',
    },
    schema: object().shape({
        firstName: string().required(isRequired),
        lastName:  string().required(isRequired),
        email:     string()
            .required(isRequired)
            .email(),
        password: string()
            .required(isRequired)
            .min(5, min5),
    }),
};
