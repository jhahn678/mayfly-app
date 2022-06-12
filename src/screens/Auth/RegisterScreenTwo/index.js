import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur';
import { FAB, Input, useTheme } from '@rneui/themed'
import PrismBackground from '../../../components/backgrounds/PrismBackground'
import AuthStackHeader from '../../../components/headers/AuthStackHeader';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useRegisterContext } from '../../../store/context/register'
import { useAuthContext } from '../../../store/context/auth';
import axios from '../../../utils/axios'

const RegisterScreenTwo = ({ navigation }) => {

    const { theme } = useTheme()
    const { formState, dispatch } = useRegisterContext()
    const { signIn } = useAuthContext()

    const handleRegister = async () => {
        try{
            const { firstName, lastName, email, username, password} = formState;
            const { data } = await axios.post('/auth/register', {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                username: username.value,
                password: password.value
            })
            await signIn(data.user, data.token)
        }catch(err){
            alert(err)
        }
        
    }

    return (
      <PrismBackground style={styles.container}>
            <AuthStackHeader navigation={navigation} title='Last Step'/>
            <BlurView intensity={10} style={styles.main}>
                <View style={styles.form}>
                    <Input 
                        leftIcon={<IonIcon name='at' size={28} color='#FFFEF3'/>} 
                        value={formState?.username.value} 
                        onChangeText={value => dispatch({ type: 'USERNAME', value: value })} 
                        label='Choose a Username'
                        inputStyle={styles.input}
                        inputContainerStyle={{...styles.inputContainer }}
                        labelStyle={{ ...styles.inputLabel }}
                        placeholderTextColor='#FFFEF3'
                        errorStyle={{ color: theme.colors.error, fontWeight: '500' }}
                        errorMessage={formState?.username.error}
                    />
                    <FAB title='Get Started' 
                        onPress={handleRegister} 
                        disabled={!formState?.username.unique || !formState?.username.isValid} 
                        containerStyle={styles.buttonContainer} 
                        buttonStyle={styles.button}
                        disabledStyle={styles.buttonDisabled}
                    />
                </View>
            </BlurView>
        </PrismBackground>
    )
}

export default RegisterScreenTwo

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  main: {
      height: '70%',
      width: '100%',
      marginBottom: '20%',
      backgroundColor: 'rgba(255, 254, 243, .4)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '35%',
      shadowColor: 'rgb(0,0,0)',
      shadowOpacity: .4,
      shadowRadius: 8,
      shadowOffset: { height: 4 },
      transform: [{ skewY: '-15deg'}]
  },
  form: {
      width: '80%',
      display: 'flex',
      alignSelf: 'center',
      transform: [{ skewY: '15deg' }]
  },
  buttonContainer: {
      marginTop: 12,
      width: '100%',
      borderRadius: 8
  },
  button: {
      backgroundColor: '#0A3542',
      color: '#FFFEF3'
  },
  buttonDisabled: {
      backgroundColor: 'rgba(10, 53, 66, .7)'
  },
  input: {
    color: '#FFFEF3',
    fontSize: 24
  },
  inputContainer: {
    borderBottomColor: '#0A3542',
    borderBottomWidth: 1,
    paddingTop: 8
  },
  inputLabel: {
    color: '#0A3542',
    fontWeight: '400'
  },
  providerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12
  }
})