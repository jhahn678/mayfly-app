import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack'
import AppTabs from './AppTabs'
import { useAuthContext } from "../store/context/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupScreen from "../screens/Groups/GroupScreen";
import MapScreen from "../screens/MapScreen";
import NewGroupScreen from "../screens/Groups/NewGroupScreen";
import NewPlaceScreen from "../screens/Places/NewPlaceScreen";
import NewCatchScreen from '../screens/Catches/NewCatchScreen'
import CameraScreen from "../screens/CameraScreen";
import PlaceScreen from "../screens/Places/PlaceScreen";
import CatchScreen from "../screens/Catches/CatchScreen";
import ContactsScreen from "../screens/Groups/ContactsScreen";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { StatusBar } from "expo-status-bar";
import GroupSettingsScreen from "../screens/Groups/GroupSettingsScreen";
import AddUserToGroupScreen from "../screens/Groups/AddUserToGroupScreen";



const RootStack = () => {

    const { isSignedIn, token } = useAuthContext()
    const Stack = createNativeStackNavigator()

    const client = new ApolloClient({
        uri: `${process.env.API_BASE_URL}/api`,
        cache: new InMemoryCache({
            dataIdFromObject: object => object._id,
            typePolicies: {
                User: { fields: { details: {
                    //Alternate here was to use username as cacheID
                    //Not really sure why it objects werent merging in
                    //the first place. For now, if incoming UserDetails comes
                    //in as undefined/null, just return the existing
                    merge: (existing, incoming, { mergeObjects }) => {
                        if(existing && !incoming){
                            return existing
                        }else{
                            return mergeObjects(existing, incoming)
                        }
                    }
                }}}
            }
        }),
        defaultOptions:{ 
            query: { fetchPolicy: 'cache-first' }
        },
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return (
        <NavigationContainer>
            { isSignedIn ? 
                <ApolloProvider client={client}>
                    <StatusBar style='auto'/>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='MainTabs' component={AppTabs}/>
                        <Stack.Screen name='GroupScreen' component={GroupScreen}/>
                        <Stack.Group screenOptions={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom'}}>
                            <Stack.Screen name='NewPlace' component={NewPlaceScreen}/>
                            <Stack.Screen name='NewCatch' component={NewCatchScreen}/>
                            <Stack.Screen name='NewGroup' component={NewGroupScreen}/>
                            <Stack.Screen name='GroupSettings' component={GroupSettingsScreen}/>
                            <Stack.Screen name='AddUserToGroup' component={AddUserToGroupScreen}/>
                            <Stack.Screen name='Map' component={MapScreen}/>
                            <Stack.Screen name='Camera' component={CameraScreen}/>
                            <Stack.Screen name='Place' component={PlaceScreen}/>
                            <Stack.Screen name='Catch' component={CatchScreen}/>
                            <Stack.Screen name='Contacts' component={ContactsScreen}/>
                        </Stack.Group>
                    </Stack.Navigator>
                </ApolloProvider> 
                : <AuthStack/>
            }
        </NavigationContainer>
    )
}

export default RootStack;