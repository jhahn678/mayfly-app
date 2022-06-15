import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const CreateHeader = ({ title }) => {

    const navigation = useNavigation()

    return (
        <View style={{...globalStyles.boxShadowBottom, ...styles.header}}>
            <View style={styles.headerContent}>
                <IonIcon 
                    name='md-return-up-back' 
                    size={32} 
                    style={{...globalStyles.fontShadow, ...styles.back}}
                    onPress={() => navigation.goBack()}
                /> 
                <Text style={{...globalStyles.fontShadow, ...styles.title}}>{title}</Text>
            </View>
        </View>
    )
}

export default CreateHeader

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
        fontWeight: '500',
        color: '#353440'
    },
    back: {
        color: '#353440',
        marginRight: 12
    }
})