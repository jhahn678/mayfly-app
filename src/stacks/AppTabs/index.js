import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles';
import ExploreStack from './ExploreStack'
import PlacesStack from './PlacesStack'
import CatchesStack from './CatchesStack'
import GroupsScreen from '../../screens/Groups/GroupsScreen';
import FontelloIcon from '../../components/icons/Fontello';

const AppTabs = () => {

    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator 
            initialRouteName="Home" 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0eaaa7',
                tabBarInactiveTintColor: '#353440',
                tabBarStyle: { position: 'absolute', height: 90, paddingTop: 12 },
                tabBarBackground: () => (
                    <View
                        style={{ 
                            ...globalStyles.boxShadowTop,
                            height: '100%',
                            backgroundColor: '#fefefe'
                        }} 
                    />
                )
            }}
        >
            <Tab.Screen name='Explore' component={ExploreStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='earth' color={color} size={48}/>),
                tabBarLabel: 'Explore'
            }}/>
            <Tab.Screen name='Catches' component={CatchesStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='fish' color={color} size={52}/>),
                tabBarLabel: 'Catches'
            }}/>
            <Tab.Screen name='Places' component={PlacesStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='map' color={color} size={32}/>),
                tabBarLabel: 'Places'
            }}/>
            <Tab.Screen name='Groups' component={GroupsScreen} options={{
                tabBarIcon: ({ color }) => (<IonIcon name='people-outline' color={color} size={36}/>),
                tabBarLabel: 'Groups',
            }}/>
        </Tab.Navigator>
    )
}

export default AppTabs;