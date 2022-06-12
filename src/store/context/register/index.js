import { useContext, createContext, useReducer, useEffect } from "react"
import { reducer } from "./reducer"
import axios from '../../../utils/axios'

const initialState = {
    firstName: { value: '', isTouched: false, isValid: false, error: null },
    lastName: { value: '', isTouched: false, isValid: false, error: null },
    email: { value: '', isTouched: false, isValid: false, error: null, unique: false },
    password: { value: '', isTouched: false, isValid: false, error: null },
    username: { value: '', isTouched: false, isValid: false, error: null, unique: false },
    formStepOne: { isValid: false }
}

const initialContextState = {
    formState: initialState,
    dispatch: () => {}
}

const RegisterContext = createContext(initialContextState)


export const RegisterContextProvider = ({ children }) => {

    const [formState, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: 'FORM_STEP_ONE_VALIDATE' })
    }, [
        formState.firstName.isValid, 
        formState.lastName.isValid, 
        formState.email.isValid, 
        formState.password.isValid,
        formState.email.unique
    ])

    useEffect(() => {
        if(formState.username.isValid){
            const timer = setTimeout(() => {
                validateUniqueUsername(formState.username.value)
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [formState.username.value])

    useEffect(() => {
        if(formState.email.isValid){
            const timer = setTimeout(() => {
                validateUniqueEmail(formState.email.value)
            }, 800)
            return () => clearTimeout(timer)
        }
      }, [formState.email.value])

    const validateUniqueEmail = async (email) => {
        const res = await axios.get(`/auth/email?value=${email}`)
        dispatch({ 
            type: 'EMAIL_UNIQUE', 
            value: res.status === 200 ? true : false
        })
    }

    const validateUniqueUsername = async (username) => {
        const res = await axios.get(`/auth/username?value=${username}`)
        dispatch({ 
            type: 'USERNAME_UNIQUE', 
            value: res.status === 200 ? true : false
        })
    }
    

    return(
        <RegisterContext.Provider value={{ formState, dispatch }}>
            {children}
        </RegisterContext.Provider>
    )
}

export const useRegisterContext = () => useContext(RegisterContext)