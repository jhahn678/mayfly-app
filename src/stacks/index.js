import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack'
import AppTabs from './AppTabs'
import { useAuthContext } from "../store/context/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupScreen from "../screens/Groups/GroupScreen";
import NewGroupScreen from "../screens/Groups/NewGroupScreen";
import NewPlaceScreen from "../screens/Global/NewPlaceScreen";
import NewCatchScreen from '../screens/Catches/NewCatchScreen'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const RootStack = () => {

    const { isSignedIn, token } = useAuthContext()
    const Stack = createNativeStackNavigator()

    const client = new ApolloClient({
        uri: `${process.env.API_BASE_URL}/api`,
        cache: new InMemoryCache(),
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return (
        <NavigationContainer>
            { isSignedIn ? 
                <ApolloProvider client={client}>
                    <Stack.Navigator>
                        <Stack.Screen name='MainTabs' component={AppTabs} options={{ headerShown: false }}/>
                        <Stack.Screen name='NewPlace' component={NewPlaceScreen} options={{ headerShown: false }}/>
                        <Stack.Screen name='NewCatch' component={NewCatchScreen} options={{ headerShown: false }}/>
                        <Stack.Screen name='NewGroup' component={NewGroupScreen} options={{ headerShown: false }}/>
                        <Stack.Screen name='GroupScreen' component={GroupScreen} options={{ headerShown: false }}/>
                    </Stack.Navigator> 
                </ApolloProvider> : 
                <AuthStack/>
            }
        </NavigationContainer>
    )
}

export default RootStack;