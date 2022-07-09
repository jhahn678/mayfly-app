import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { Avatar } from '@rneui/themed';
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap';
import { useNavigation } from '@react-navigation/core';
import { useGetGroupFromCache } from '../../../hooks/queries/getGroupFromCache'
import { useEffect, useState } from 'react';

const GroupHeader = ({ groupId, numberOfUsers, onGoBack }) => {
    

    const navigateToMap = useNavigateToMap()
    const navigation = useNavigation()
    const { getGroup } = useGetGroupFromCache()
    const [cachedData, setCachedData] = useState({ _id: '', avatar: { url: null }, name: '' })

    useEffect(() => {
        setCachedData(getGroup(groupId))
    },[])

    const handleGoBack = () => {
        onGoBack && onGoBack()
        navigation.goBack()
    }

    return (
        <View style={{...globalStyles.boxShadowBottom, ...styles.header}}>
            <View style={styles.headerContent}>

                <IonIcon 
                    name='md-return-up-back' 
                    size={28} color
                    style={{...globalStyles.fontShadow, ...styles.back}}
                    onPress={handleGoBack}
                /> 

                <TouchableOpacity onPress={() => navigation.navigate('GroupSettings', { groupId: groupId })} style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar source={{ uri: cachedData.avatar.url }} title={cachedData.name[0]} size={52} rounded containerStyle={styles.avatar}/>
                    <View style={styles.group}>
                        <Text style={styles.title}>{cachedData.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 2}}>
                            <Text style={styles.members}>{numberOfUsers ? `${numberOfUsers} members` : '...loading'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <IonIcon 
                    name='map-outline' 
                    size={28} 
                    style={styles.mapIcon}
                    onPress={() => navigateToMap({ groupId: groupId, showToggle: true, catches: true, places: true })}
                /> 

            </View>
        </View>
    )
}

export default GroupHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '12%',
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#fefefe',
        position: 'relative',
        zIndex: 100,
        borderRadius: 12,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 8,
        elevation: 6,
        shadowOffset: { height: 2 },
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 16,
        paddingBottom: 12
    },
    avatar: { 
        borderColor: 'rgba(53, 52, 64, .3)',
        borderWidth: 1
    },
    group: {
        paddingLeft: 6
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: '#032836'
    },
    members: {
        fontWeight: '300',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#032836'
    },
    back: {
        color: '#032836',
        marginRight: 12
    },
    mapIcon: {
        color: '#032836',
        position: 'absolute',
        right: 20,
        top: 12
    }
})