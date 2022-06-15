import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';

const GroupHeader = ({ title }) => {

    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={{...globalStyles.boxShadowBottom, ...styles.header}}>
            <View style={styles.headerContent}>
                <IonIcon 
                    name='md-return-up-back' 
                    size={32} 
                    style={{...globalStyles.fontShadow, ...styles.back}}
                    onPress={() => navigation.goBack()}
                /> 
                <Text style={{...globalStyles.fontShadow, ...styles.title}}>{title || 'Group name'}</Text>
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
        justifyContent: 'flex-end'
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 16,
        paddingBottom: 12
    },
    title: {
        fontSize: 32,
        fontWeight: '400',
    },
    back: {
        marginRight: 12
    }
})