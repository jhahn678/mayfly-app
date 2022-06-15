import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';

const GroupHeader = ({ groupId, name, avatar, numberOfUsers }) => {

    const navigation = useNavigation()

    return (
        <View style={{...globalStyles.boxShadowBottom, ...styles.header}}>
            <View style={styles.headerContent}>
                <IonIcon 
                    name='md-return-up-back' 
                    size={28} 
                    style={{...globalStyles.fontShadow, ...styles.back}}
                    onPress={() => navigation.goBack()}
                /> 
                <Avatar source={{ uri: avatar }} size={52} rounded containerStyle={styles.avatar}/>
                <View style={styles.group}>
                    <Text style={{...globalStyles.fontShadow, ...styles.title}}>{name}</Text>
                    <Text style={{...globalStyles.fontShadow, ...styles.members}}>{numberOfUsers} members</Text> 
                </View>
                <IonIcon 
                    name='map-outline' 
                    size={28} 
                    style={styles.mapIcon}
                    onPress={() => navigation.navigate('CatchesMap')}
                /> 
            </View>
        </View>
    )
}

export default GroupHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '13%',
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
        fontWeight: '300'
    },
    back: {
        color: '#353440',
        marginRight: 12
    },
    mapIcon: {
        color: '#353440',
        position: 'absolute',
        right: 20,
        top: 12
    }
})