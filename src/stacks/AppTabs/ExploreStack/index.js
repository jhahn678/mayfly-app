import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../../../screens/Explore/FeedScreen'
import MapScreen from '../../../screens/Explore/MapScreen'

const ExploreStack = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name='GlobalFeed' component={FeedScreen}/>
            <Stack.Screen name='GlobalMap' component={MapScreen}/>
        </Stack.Navigator>
    )
}

export default ExploreStack

const styles = StyleSheet.create({})