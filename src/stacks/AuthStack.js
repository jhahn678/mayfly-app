import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreenOne from '../screens/RegisterScreenOne';
import RegisterScreenTwo from '../screens/RegisterScreenTwo';
import { RegisterContextProvider } from '../store/context/register';


const AuthStack = () => {

    const Stack = createNativeStackNavigator()
    
    return (
        <RegisterContextProvider>
            <Stack.Navigator>
                <Stack.Screen name='Sign In' component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='Sign Up' component={RegisterScreenOne} options={{ headerShown: false }}/>
                <Stack.Screen name='Choose Username' component={RegisterScreenTwo} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </RegisterContextProvider>
    )
}

export default AuthStack;