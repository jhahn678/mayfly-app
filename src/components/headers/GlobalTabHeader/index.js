import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

const GlobalTabHeader = ({}) => {

    const route = useRoute()
    const navigation = useNavigation()

    return (
        <BlurView intensity={10} style={{ ...styles.header, ...globalStyles.boxShadowBottom }}>
            <View style={styles.headerContent}>
                <Text style={{...styles.title, ...globalStyles.fontShadow }}>Global</Text>
                { route.name === 'GlobalMap' ?
                    <IonIcon
                        name='list-outline'
                        size={36} 
                        style={{...globalStyles.fontShadow}}
                        onPress={() => navigation.navigate('GlobalFeed')}
                    /> :
                    <IonIcon 
                        name='map-outline' 
                        size={36} 
                        style={{...globalStyles.fontShadow}}
                        onPress={() => navigation.navigate('GlobalMap')}
                    /> 
                }
            </View>
        </BlurView>
    )
}

export default GlobalTabHeader

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
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12
    },
    title: {
        fontSize: 32,
        fontWeight: '400'
    }
})