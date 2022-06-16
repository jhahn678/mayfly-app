import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const GroupMapScreen = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IonIcon name='chevron-down' size={36}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GroupMapScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 36,
        paddingRight: 12
    }
})