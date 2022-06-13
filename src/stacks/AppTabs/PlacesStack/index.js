import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlacesMapsScreen from '../../../screens/Places/PlacesMapScreen'
import PlacesListScreen from '../../../screens/Places/PlacesListScreen'


const PlacesStack = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name='CatchesMap' component={PlacesMapsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='CatchesList' component={PlacesListScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default PlacesStack
