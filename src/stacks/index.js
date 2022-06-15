import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack'
import AppTabs from './AppTabs'
import { useAuthContext } from "../store/context/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupScreen from "../screens/Groups/GroupScreen";
import NewGroupScreen from "../screens/Groups/NewGroupScreen";
import NewPlaceScreen from "../screens/Explore/NewPlaceScreen";
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
            {/* { isSignedIn ?  */}
                <ApolloProvider client={client}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='MainTabs' component={AppTabs}/>
                        <Stack.Screen name='NewPlace' component={NewPlaceScreen}/>
                        <Stack.Screen name='NewCatch' component={NewCatchScreen}/>
                        <Stack.Screen name='NewGroup' component={NewGroupScreen}/>
                        <Stack.Screen name='GroupScreen' component={GroupScreen}/>
                    </Stack.Navigator> 
                </ApolloProvider> 
                {/* : <AuthStack/>
            } */}
        </NavigationContainer>
    )
}

export default RootStack;