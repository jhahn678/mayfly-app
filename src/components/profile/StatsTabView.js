import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { TabView } from "@rneui/themed";
import { useEffect, useState } from 'react'
import PlacesListItem from '../../components/places/PlacesListItem'
import CatchesListItem from '../../components/catches/CatchesListItem'
import { useNavigation } from '@react-navigation/core';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { formatProfileCreatedAt } from '../../utils/format-dates';
import { useAuthContext } from '../../store/context/auth';

const StatsTabView = () => {

    const navigation = useNavigation()
    const { user } = useAuthContext()


    return (
        <TabView.Item style={{ width: '100%' }}>

            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

                <View style={styles.item}>
                    <Text style={styles.label}>Member Since: </Text>
                    <Text style={styles.value}>{formatProfileCreatedAt(user.createdAt)}</Text>
                </View>

                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Catches')}>
                    <Text style={styles.label}>Total Catches: </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.value}>4 </Text>
                        <IonIcon name='chevron-forward' size={16}/>
                    </View>
                </TouchableOpacity>

                <View style={styles.item}>
                    <Text style={styles.label}>Most caught species: </Text>
                    <Text style={styles.value}>Rainbow Trout</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>2nd Most caught species: </Text>
                    <Text style={styles.value}>Largemouth Bass</Text>
                </View>

                {/* <View style={styles.itemCol}>
                    <Text style={styles.label}>Personal Best: </Text>
                    <CatchesListItem item={} style={styles.preview}/>
                </View> */}

                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Places')}>
                    <Text style={styles.label}>Saved Locations: </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.value}>4 </Text>
                        <IonIcon name='chevron-forward' size={16}/>
                    </View>
                </TouchableOpacity>

                {/* <View style={styles.itemCol}>
                    <Text style={styles.label}>Top location: </Text>
                    <PlacesListItem item={} style={styles.preview}/>
                </View> */}

            </ScrollView>

        </TabView.Item>
    )
}

export default StatsTabView

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingLeft: 16,
        paddingRight: 32,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(220,220,220)'
    },
    itemCol: {
        width: '100%',
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: 32,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(220,220,220)'
    },
    label: {
        fontSize: 14,
        fontWeight: '300',
        fontStyle: 'italic'
    },
    value: {
        fontSize: 14,
        fontWeight: '500'
    },
    preview: {
        borderColor: 'rgb(220,220,220)',
        borderWidth: .5,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 12
    }
})