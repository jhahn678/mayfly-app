import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { useAuthContext } from '../store/context/auth';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const AppStack = () => {

    const Stack = createNativeStackNavigator()
    const { token } = useAuthContext()

    const client = new ApolloClient({
        uri: `${process.env.API_BASE_URL}/api`,
        cache: new InMemoryCache(),
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    
    return (
        <ApolloProvider client={client}>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeScreen}/>
            </Stack.Navigator>
        </ApolloProvider>
    )
}

export default AppStack;