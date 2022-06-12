import { nameSchema, passwordSchema, emailSchema } from "../../../utils/yup-schemas";

export const reducer = (state, action) => {
    if(action.type === 'EMAIL'){
        const { email } = state;
        email.value = action.value;
        email.isTouched = true;
        try{
            emailSchema.validateSync(action.value)
            email.isValid = true;
            email.error = null;
        }catch(err){
            email.isValid = false;
            email.error = err.message;
        }
        return{ ...state, email }
    }else if(action.type === 'EMAIL_UNIQUE'){
        const { email } = state;
        action.value === true ? email.unique = true : email.unique = false;
        return{ ...state, email }
    }else if(action.type === 'PASSWORD'){
        const { password } = state;
        password.value = action.value;
        password.isTouched = true;
        try{
            passwordSchema.validateSync(action.value)
            password.isValid = true;
            password.error = null;
        }catch(err){
            password.isValid = false;
            password.error = err.message;
        }
        return{
            ...state,
            password
        }
    }else if(action.type === 'FIRSTNAME'){
        const { firstName } = state;
        firstName.value = action.value;
        firstName.isTouched = true;
        try{
            nameSchema.validateSync(action.value)
            firstName.isValid = true;
            firstName.error = null;
        }catch(err){
            firstName.isValid = false;
            firstName.error = err.message;
        }
        return{
            ...state,
            firstName
        }
    }else if(action.type === 'LASTNAME'){
        const { lastName } = state;
        lastName.value = action.value;
        lastName.isTouched = true;
        try{
            nameSchema.validateSync(action.value)
            lastName.isValid = true;
            lastName.error = null;
        }catch(err){
            lastName.isValid = false;
            lastName.error = err.message;
        }
        return{
            ...state,
            lastName
        }
    }else if(action.type === 'FORM_STEP_ONE_VALIDATE'){
        const { firstName, lastName, email, password, formStepOne } = state;
        if(firstName.isValid && lastName.isValid && email.isValid && password.isValid && email.unique){ 
                formStepOne.isValid = true;
        }else{
            formStepOne.isValid = false;
        }
        return {
            ...state,
            formStepOne
        }
    }else if(action.type === 'USERNAME'){
        const { username } = state;
        username.value = action.value;
        username.isTouched = true;
        if(username.value.length >= 5){
            username.isValid = true;
            username.error = null;
        }else{
            username.isValid = false;
            username.error = 'Username too short'
        }
        return {
            ...state,
            username
        }
    }else if(action.type === 'USERNAME_UNIQUE'){
        const { username } = state;
        if(action.value === true){
            username.unique = true 
            username.error = null
        }else{
            username.unique = false;
            username.error = 'Username is taken'
        }
        return{ ...state, username }
    }else{
        return state;
    }
}