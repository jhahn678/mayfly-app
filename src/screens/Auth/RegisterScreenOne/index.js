import { StyleSheet, View, Dimensions, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import { Input, useTheme } from '@rneui/themed'
import AuthStackHeader from '../../../components/headers/AuthStackHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginButton from '../../../components/buttons/GoogleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../../components/buttons/FacebookLoginButton/FacebookLoginButton';
import { useRegisterContext } from '../../../store/context/register'
import { useNavigation } from '@react-navigation/core';
import AuthBackground from '../../../components/backgrounds/AuthBackground';


const RegisterScreenOne = () => {

    const navigation = useNavigation()
    const { width: screenWidth } = Dimensions.get('window')
    const { theme } = useTheme()

    const handleNextStep = async () => {
        navigation.navigate('RegisterTwo')
    }
    
    const { formState, dispatch } = useRegisterContext()

    return (
        <AuthBackground style={styles.container}>
            <AuthStackHeader title='Sign Up' showBackArrow style={{ position: 'absolute', top: 0 }}/>
            <View style={styles.main}>
                <Input leftIcon={<Icon name='person-outline' size={20} color='#0A3542'/>}   
                    onChangeText={value => dispatch({ type: 'FIRSTNAME', value: value})} 
                    label='First name' inputStyle={styles.input}
                    inputContainerStyle={{...styles.inputContainer }}
                    labelStyle={{ ...styles.inputLabel }} value={formState?.firstName.value} 
                    errorStyle={{ color: theme.colors.error, fontWeight: '500' }}
                    errorMessage={formState?.firstName.error}
                />
                <Input leftIcon={<Icon name='person-outline' size={20} color='#0A3542'/>}   
                    onChangeText={value => dispatch({ type: 'LASTNAME', value: value})} 
                    label='Last name' inputStyle={styles.input}
                    inputContainerStyle={{...styles.inputContainer }}
                    labelStyle={{ ...styles.inputLabel }} value={formState?.lastName.value} 
                    errorStyle={{ color: theme.colors.error, fontWeight: '500' }}
                    errorMessage={formState?.lastName.error}
                />
                <Input leftIcon={<Icon name='mail-outline' size={20} color='#0A3542'/>}   
                    onChangeText={value => dispatch({ type: 'EMAIL', value: value})} 
                    label='Email' inputStyle={styles.input}
                    inputContainerStyle={{...styles.inputContainer }}
                    labelStyle={{ ...styles.inputLabel }} value={formState?.email.value} 
                    errorStyle={{ color: theme.colors.error, fontWeight: '500' }}
                    errorMessage={formState?.email.error}
                />
                <Input leftIcon={<Icon name='lock-closed-outline' size={20} color='#0A3542'/>}  
                    onChangeText={value => dispatch({ type: 'PASSWORD', value: value})} 
                    label='Password' inputStyle={styles.input}
                    inputContainerStyle={{...styles.inputContainer }}
                    labelStyle={{ ...styles.inputLabel }} value={formState?.password.value} 
                    errorStyle={{ color: theme.colors.error, fontWeight: '500' }}
                    errorMessage={formState?.password.error}
                />
                <TouchableOpacity onPress={handleNextStep} disabled={!formState?.formStepOne.isValid}>
                    <Text style={!formState?.formStepOne.isValid ? styles.buttonDisabled : styles.button}>
                        Next <Icon name='arrow-forward' size={18}/>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.providerButtonContainer}>
                <GoogleLoginButton iconSize={36} containerStyle={{ width: screenWidth*.44 }}/>
                <FacebookLoginButton iconSize={36} containerStyle={{ width: screenWidth*.44 }}/>
            </View>
        </AuthBackground>
    )
}

export default RegisterScreenOne;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width: '90%',
        display: 'flex',
        alignItems: 'flex-end',
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 6,
        elevation: 12,
        shadowOffset: { height: 6 },
        backgroundColor: '#fefefe',
        paddingVertical: 24,
        paddingHorizontal: 12,
        borderRadius: 12
    },
    button: {
        fontSize: 20,
        marginTop: 16,
        marginRight: 12
    },
    buttonDisabled: {
        fontSize: 20,
        marginTop: 16,
        marginRight: 12,
        color: 'rgb(180,180,180)'
    },
    input: {
        fontSize: 20,
        paddingLeft: 4
    },
    inputContainer: {
        borderBottomColor: '#0A3542',
        borderBottomWidth: .5
    },
    inputLabel: {
        color: '#0A3542',
        fontWeight: '300',
        fontSize: 14
    },
    providerButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        width: '90%'
    },
    shadow: {
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 6,
        elevation: 4,
        shadowOffset: { height: 6 }
    }
})