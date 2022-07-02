import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core';

const AuthStackHeader = ({ showBackArrow, title, style, titleStyle }) => {

    const navigation = useNavigation()

    return (
        <View style={{...styles.header, ...style }}>
            <View style={styles.headerContent}>
                { showBackArrow &&
                    <IonIcon 
                        name='md-return-up-back' 
                        size={32} 
                        style={styles.back} 
                        onPress={() => navigation.goBack()}
                    /> 
                }
                <Text style={{...styles.title, ...titleStyle}}>{title}</Text>
            </View>
        </View>
    )
}

export default AuthStackHeader;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '12%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: 15,
        paddingLeft: 15,
    },
    headerContent: {
        paddingLeft: '2%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        paddingLeft: '2%',
        color: '#0A3542',
    },
    back: {
        color: '#0A3542',
        marginRight: 12
    }
})