import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { Avatar } from '@rneui/themed';
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap';
import { useNavigation } from '@react-navigation/core';

const GroupHeader = ({ groupId, name, avatar, numberOfUsers, onGoBack }) => {
    

    const navigateToMap = useNavigateToMap()
    const navigation = useNavigation()

    const handleGoBack = () => {
        onGoBack && onGoBack()
        navigation.goBack()
    }

    return (
        <View style={{...globalStyles.boxShadowBottom, ...styles.header}}>
            <View style={styles.headerContent}>

                <IonIcon 
                    name='md-return-up-back' 
                    size={28} 
                    style={{...globalStyles.fontShadow, ...styles.back}}
                    onPress={handleGoBack}
                /> 
                <Avatar source={{ uri: avatar }} size={52} rounded containerStyle={styles.avatar}/>
                <View style={styles.group}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.members}>{numberOfUsers} members</Text>
                    </View>
                </View>


                <IonIcon 
                    name='settings-outline' 
                    size={28} 
                    style={styles.settings} 
                    onPress={() => navigation.navigate('GroupSettings', { groupId: groupId })}
                />
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
        borderBottomColor: '#353440',
        borderBottomWidth: .5,
        backgroundColor: '#fefefe'
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
        color: '#353440'
    },
    members: {
        fontWeight: '300',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    back: {
        color: '#353440',
        marginRight: 12
    },
    settings: {
        color: '#353440',
        position: 'absolute',
        right: 64,
        top: 12
    },
    mapIcon: {
        color: '#353440',
        position: 'absolute',
        right: 20,
        top: 12
    }
})