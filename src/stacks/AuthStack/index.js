import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterScreenOne from '../../screens/Auth/RegisterScreenOne';
import RegisterScreenTwo from '../../screens/Auth/RegisterScreenTwo';
import ForgotPasswordScreen from '../../screens/Auth/ForgotPasswordScreen';
import { RegisterContextProvider } from '../../store/context/register';


const AuthStack = () => {

    const Stack = createNativeStackNavigator()
    
    return (
        <RegisterContextProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SignIn' component={LoginScreen}/>
                <Stack.Screen name='RegisterOne' component={RegisterScreenOne}/>
                <Stack.Screen name='RegisterTwo' component={RegisterScreenTwo}/>
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
            </Stack.Navigator>
        </RegisterContextProvider>
    )
}

export default AuthStack;