import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const CreateHeader = ({ title }) => {

    const navigation = useNavigation()

    return (
        <BlurView intensity={10} style={{...globalStyles.boxShadowBottom, ...styles.header}}>
            <View style={styles.headerContent}>
                <IonIcon 
                    name='md-return-up-back' 
                    size={32} 
                    style={{...globalStyles.fontShadow, ...styles.back}}
                    onPress={() => navigation.goBack()}
                /> 
                <Text style={{...globalStyles.fontShadow, ...styles.title}}>{title}</Text>
            </View>
        </BlurView>
    )
}

export default CreateHeader

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'rgba(10, 53, 66, .6)', 
        width: '100%',
        height: '13%',
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
        color: '#FFFEF3'
    },
    back: {
        color: '#FFFEF3',
        marginRight: 12
    }
})