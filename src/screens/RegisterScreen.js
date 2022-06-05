import { StyleSheet, Text, View } from 'react-native'
import { Input, FAB } from '@rneui/themed'
import { useState, useEffect, useReducer } from 'react'
import { nameSchema, emailSchema, passwordSchema } from '../utils/yup-schemas'

const initialState = {
    firstName: { value: '', isTouched: false, isValid: false, error: null },
    lastName: { value: '', isTouched: false, isValid: false, error: null },
    email: { value: '', isTouched: false, isValid: false, error: null },
    password: { value: '', isTouched: false, isValid: false, error: null },
    passwordConfirm: { value: '', isTouched: false, isValid: false, error: null },
    form: { isValid: false }
}

const formReducer = (state, action) => {
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
        return{
            ...state,
            email
        }
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
    }else if(action.type === 'PASSWORD_CONFIRM'){
        const { passwordConfirm, password} = state;
        passwordConfirm.value = action.value;
        passwordConfirm.isTouched = true;
        action.value === password.value ? passwordConfirm.isValid = true : passwordConfirm.isValid = false;
        action.value === password.value ? passwordConfirm.error = null : passwordConfirm.error = 'Passwords do not match'
        return{
            ...state,
            passwordConfirm
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
    }else if(action.type === 'FORM_VALIDATE'){
        const { firstName, lastName, email, password, passwordConfirm, form } = state;
        if(
            firstName.isValid &&
            lastName.isValid && 
            email.isValid &&
            password.isValid && 
            passwordConfirm.isValid
        ){
            form.isValid = true;
        }else{
            form.isValid = false;
        }
        return {
            ...state,
            form
        }
    }else{
        return state;
    }
}

const RegisterScreen = ({ navigation }) => {

    const [formState, dispatch] = useReducer(formReducer, initialState)

    const [user, setUser] = useState({})

    useEffect(() => {
        dispatch({ type: 'FORM_VALIDATE' })
    }, [
        formState.firstName.isValid, 
        formState.lastName.isValid, 
        formState.email.isValid, 
        formState.password.isValid, 
        formState.passwordConfirm.isValid
    ])
    

    const handleRegister = async () => {
        const { email, password, firstName, lastName } = formState;
        console.log(email, password, firstName, lastName)
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Input placeholder='First name' value={formState.firstName.value} onChangeText={value => dispatch({ type: 'FIRSTNAME', value: value})}/>
                <Input placeholder='Last name' value={formState.lastName.value} onChangeText={value => dispatch({ type: 'LASTNAME', value: value})}/>
                <Input placeholder='Email' value={formState.email.value} onChangeText={value => dispatch({ type: 'EMAIL', value: value})} errorMessage={formState.email.error}/>
                <Input placeholder='Password' value={formState.password.value} onChangeText={value => dispatch({ type: 'PASSWORD', value: value})} errorMessage={formState.password.error}/>
                <Input placeholder='Password Confirmation' value={formState.passwordConfirm.value} onChangeText={value => dispatch({ type: 'PASSWORD_CONFIRM', value: value})} errorMessage={formState.passwordConfirm.error}/>
                <FAB title='Get started' onPress={handleRegister} disabled={!formState.form.isValid}/>
            </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffef3',
        height: '100%'
    },
    form: {
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
        marginTop: '20%'
    }
})