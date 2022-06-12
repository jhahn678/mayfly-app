import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GroupsScreen from '../../../screens/Groups/GroupsScreen'
import GroupScreen from '../../../screens/Groups/GroupScreen'
import NewGroupScreen from '../../../screens/Groups/NewGroupScreen'


const GroupStack = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name='GroupsList' component={GroupsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='ViewGroup' component={GroupScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='NewGroup' component={NewGroupScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default GroupStack