import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FAB } from '@rneui/themed';
import axios from '../../utils/axios'
import { useAuthContext } from '../../store/context/auth'
import PrismBackground from '../../components/backgrounds/PrismBackground';
import AuthStackHeader from '../../components/headers/AuthStackHeader';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from '../../components/inputs/IconInput';
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton/FacebookLoginButton';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidden, setHidden] = useState(true )

  const { signIn } = useAuthContext()

  const handleLogin = async () => {
    try{
      const { data } = await axios.post('/auth/login', { email, password })
      await signIn(data.user, data.token)
    }catch(err){
      alert(err)
    }
  }
  
  return (
      <PrismBackground style={styles.container}>
        <AuthStackHeader title='Sign in' />
        <BlurView intensity={10} style={styles.main}>
          <View style={styles.form}>
            <IconInput Icon={<Icon name='mail-outline' size={28}/>} 
              value={email}
              setValue={setEmail}
              label='Email'
            />
            <IconInput 
              Icon={
                <Icon name={hidden ? 'lock-closed-outline' : 'lock-open-outline'} 
                  size={28}
                  onPress={() => setHidden(h => !h)}
                />
              } 
              value={password}
              setValue={setPassword}
              label='Password'
              containerStyle={styles.bottomInput}
              isPassword={hidden}
            />
            <FAB
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
              title='Sign In'
              onPress={handleLogin}
            />
            <View style={styles.providerButtonContainer}>
                <GoogleLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
                <FacebookLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
            </View>
            <View style={styles.altAuthPrompts}>
              <TouchableOpacity onPress={() => navigation.navigate('Choose Username')}>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
              <Text style={styles.noAccount}>Don't have an account? 
                <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.getStarted}>Get started</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </BlurView>
      </PrismBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },
    main: {
      height: '65%',
      width: '100%',
      marginBottom: '25%',
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
      transform: [{ skewY: '15deg'}]
    },
    providerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24
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
    bottomInput: {
      marginTop: 12
    },
    altAuthPrompts: {
      display: 'flex',
      marginTop: 24
    },
    forgotPassword: {
      fontSize: 14,
      fontWeight: '500',
      padding: 0,
    },
    noAccount: {
      fontSize: 12,
      marginTop: 12,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline'
    },
    getStarted: {
      height: 14,
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500'
    }
})