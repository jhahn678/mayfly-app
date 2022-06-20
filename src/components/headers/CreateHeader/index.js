import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const CreateHeader = ({ title, color, containerStyle, rightNode, onGoBack }) => {

    const navigation = useNavigation()

    const handleGoBack = () => {
        onGoBack && onGoBack()
        navigation.goBack()
    }

    return (
        <View style={{...containerStyle, ...styles.header}}>
            <View style={styles.headerContent}>
                <IonIcon 
                    name='md-return-up-back' 
                    size={32} 
                    style={styles.back}
                    onPress={handleGoBack}
                /> 
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={styles.right}>
                    {rightNode}
                </View>
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
        fontSize: 24,
        fontWeight: '500',
        color: '#fefefe'
    },
    back: {
        color: '#353440',
        marginRight: 12,
        color: '#fefefe'
    },
    right: {
        position: 'absolute',
        top: -8,
        right: 16
    }
})