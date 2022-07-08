import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons'
import ExploreStack from './ExploreStack'
import GroupsScreen from '../../screens/Groups/GroupsScreen';
import FontelloIcon from '../../components/icons/Fontello';
import CatchesScreen from '../../screens/Catches/CatchesScreen';
import PlacesScreen from '../../screens/Places/PlacesScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { useAuthContext } from '../../store/context/auth';
import { Avatar } from '@rneui/themed';

const AppTabs = () => {

    const Tab = createBottomTabNavigator();
    const { user } = useAuthContext()
    
    return (
        <Tab.Navigator 
            initialRouteName="Home" 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0eaaa7',
                tabBarStyle: { position: 'absolute', height: 80 }
            }}
        >
            <Tab.Screen name='Explore' component={ExploreStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='earth' color={color} size={28}/>),
                tabBarShowLabel: false
            }}/>
            <Tab.Screen name='Catches' component={CatchesScreen} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='fish' color={color} size={28}/>),
                tabBarShowLabel: false
            }}/>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Avatar source={{ uri: user.details?.avatar?.url }}
                    title={user.firstName[0]} size={32} rounded 
                    containerStyle={{ backgroundColor: color, borderWidth: 1, borderColor: color }}/>
                ),
                tabBarShowLabel: false
            }}/>
            <Tab.Screen name='Places' component={PlacesScreen} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='map' color={color} size={28}/>),
                tabBarShowLabel: false
            }}/>
            <Tab.Screen name='Groups' component={GroupsScreen} options={{
                tabBarIcon: ({ color }) => (<IonIcon name='chatbubbles-outline' color={color} size={28}/>),
                tabBarShowLabel: false
            }}/>
        </Tab.Navigator>
    )
}

export default AppTabs;