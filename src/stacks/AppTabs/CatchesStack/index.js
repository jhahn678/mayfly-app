import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapScreen from '../../../screens/Catches/MapScreen'
import CatchesScreen from '../../../screens/Catches/CatchesScreen'
import ViewCatchScreen from '../../../screens/Catches/ViewCatchScreen'

const CatchesStack = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name='CatchesList' component={CatchesScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='CatchesMap' component={MapScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='ViewCatch' component={ViewCatchScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default CatchesStack
