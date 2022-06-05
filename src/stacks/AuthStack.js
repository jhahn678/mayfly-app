import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = () => {

    const Stack = createNativeStackNavigator()
    
    return (
        <Stack.Navigator>
            <Stack.Screen name='Sign In' component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack;