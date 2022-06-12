import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur';
import { FAB, Input, useTheme } from '@rneui/themed'
import PrismBackground from '../../components/backgrounds/PrismBackground'
import AuthStackHeader from '../../components/headers/AuthStackHeader';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useRegisterContext } from '../../store/context/register'

const RegisterScreenTwo = ({ navigation }) => {

    const handleRegister = () => {}

    const { theme } = useTheme()

    const { formState, dispatch } = useRegisterContext()

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
      marginTop: 24,
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
    borderBottomWidth: 1
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