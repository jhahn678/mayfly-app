import { StyleSheet, View, Text } from 'react-native'
import { FAB } from '@rneui/themed'
import PrismBackground from '../../components/backgrounds/PrismBackground'
import AuthStackHeader from '../../components/headers/AuthStackHeader';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconInput from '../../components/inputs/IconInput';
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton/FacebookLoginButton';
import { useRegisterContext } from '../../store/context/register'

const RegisterScreenTwo = ({ navigation }) => {

    const handleRegister = () => {}

    const { formState, dispatch } = useRegisterContext()

    return (
      <PrismBackground style={styles.container}>
            <AuthStackHeader navigation={navigation} title='Last'/>
            <BlurView intensity={10} style={styles.main}>
                <View style={styles.form}>
                    <IconInput 
                        Icon={<IonIcon name='person-outline' size={28}/>} 
                        value={formState?.firstName.value} 
                        setValue={value => dispatch({ type: 'FIRSTNAME', value: value })} 
                        label='First name' containerStyle={styles.input}
                    />
                    <IconInput 
                        Icon={<IonIcon name='person-outline' size={28}/>} 
                        value={formState?.lastName.value} 
                        setValue={value => dispatch({ type: 'LASTNAME', value: value})} 
                        label='Last name' containerStyle={styles.input}
                    />
                    <IconInput 
                        Icon={<IonIcon name='mail-outline' size={28}/>} 
                        value={formState?.email.value} 
                        setValue={value => dispatch({ type: 'EMAIL', value: value})} 
                        label='Email' containerStyle={styles.input}
                    />
                    <IconInput 
                        Icon={<IonIcon name='lock-closed-outline' size={28}/>} 
                        value={formState?.password.value} 
                        setValue={value => dispatch({ type: 'PASSWORD', value: value})} 
                        label='Password' containerStyle={styles.input}
                    />
                    <FAB title='Next' 
                        onPress={handleRegister} 
                        disabled={!formState?.formStepOne.isValid} 
                        containerStyle={styles.buttonContainer} 
                        buttonStyle={styles.button}
                        disabledStyle={styles.buttonDisabled}
                    />
                    <View style={styles.providerButtonContainer}>
                        <GoogleLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
                        <FacebookLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
                    </View>
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
      paddingTop: '25%',
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
      transform: [{ skewY: '15deg'}]
  },
  buttonContainer: {
      marginTop: 8,
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
      marginBottom: 12
  },
  providerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12
  }
})