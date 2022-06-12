import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur';
import IonIcon from 'react-native-vector-icons/Ionicons'

const AuthStackHeader = ({ navigation, title }) => {

    return (
        <BlurView intensity={10} style={styles.header}>
            <View style={styles.headerContent}>
                { navigation &&
                    <IonIcon 
                        name='md-return-up-back' 
                        size={32} 
                        style={styles.back} 
                        onPress={() => navigation.goBack()}
                    /> 
                }
                <Text style={styles.title}>{title}</Text>
            </View>
        </BlurView>
    )
}

export default AuthStackHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'rgba(255, 254, 243, .4)',
        width: '100%',
        height: '16%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: 15,
        paddingLeft: 15,
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: .4,
        shadowRadius: 8,
        shadowOffset: { height: 4 },
        transform: [{ skewY: '-7deg'}, { translateY: -20 }]
    },
    headerContent: {
        paddingLeft: '2%',
        transform: [{ skewY: '7deg'}],
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