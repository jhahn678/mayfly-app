import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import {  Input } from '@rneui/themed';
import axios from '../../utils/axios'
import { useAuthContext } from '../../store/context/auth'
import AuthStackHeader from '../../components/headers/AuthStackHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton/FacebookLoginButton';
import AuthBackground from '../../components/backgrounds/AuthBackground';
import AuthErrorToast from '../../components/toasts/AuthErrorToast';

const LoginScreen = ({ navigation }) => {

  const { width: screenWidth } = Dimensions.get('window')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hidden, setHidden] = useState(true)

  const { signIn } = useAuthContext()

  const handleLogin = async () => {
    try{
      setIsLoading(true)
      const { data } = await axios.post('/auth/login', { email, password })
      await signIn(data.user, data.token)
    }catch(err){
      console.error(err)
      alert('Invalid credentials')
      setEmail('')
      setPassword('')
      setIsError(true)
      setIsLoading(false)
    }
  }
  
  return (
      <AuthBackground style={styles.container}>
        <AuthStackHeader title='Sign in'/>
        {/* <AuthErrorToast visible={isError} setVisible={setIsError}/> */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'} 
          style={{ width: '100%', alignItems: 'center'}}>
          <View style={styles.main}>
            <Input leftIcon={<Icon name='mail-outline' size={20} color='#0A3542'/>}   
              onChangeText={value => setEmail(value)}
              label='Email' inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              labelStyle={styles.inputLabel} value={email} 
            />
            <Input leftIcon={
                <Icon name={hidden ? 'lock-closed-outline' : 'lock-open-outline'} 
                  size={20}
                  onPress={() => setHidden(h => !h)}
                />
              } 
              onChangeText={value => setPassword(value)}
              label='Password' inputStyle={styles.input}
              inputContainerStyle={{...styles.inputContainer }}
              labelStyle={{ ...styles.inputLabel }} value={password} 
            />
            <TouchableOpacity onPress={handleLogin} disabled={email.length === 0 || password.length === 0}>
                <Text style={styles.button}>
                    Sign in {isLoading ? <ActivityIndicator color='#0eaaa7' size='small'/> : <Icon name='arrow-forward' size={18}/> }
                </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.providerButtonContainer}>
              <GoogleLoginButton iconSize={36} containerStyle={{ width: screenWidth*.44 }}/>
              <FacebookLoginButton iconSize={36} containerStyle={{ width: screenWidth*.44 }}/>
            </View>
        </KeyboardAvoidingView>
        <View style={styles.altAuthPrompts}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterOne')}>
              <Text style={styles.noAccount}>Create a new account
                <Icon name='arrow-forward' size={16}/>
              </Text>
          </TouchableOpacity>
        </View>
      </AuthBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
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
      paddingLeft: 4,
      color: '#0A3542'
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
  },
  altAuthPrompts: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: '15%',
    paddingRight: 36
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    padding: 0
  },
  noAccount: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500',
  }
})