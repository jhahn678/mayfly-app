import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native'

const PlacesTabHeader = () => {

    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View style={{ ...styles.header }}>
            <View style={styles.headerContent}>
                <Text style={{...styles.title, ...globalStyles.fontShadow }}>My Places</Text>
                { route.name === 'CatchesMap' ?
                    <IonIcon
                        name='list-outline'
                        size={36} 
                        style={{...globalStyles.fontShadow}}
                        onPress={() => navigation.navigate('CatchesList')}
                    /> :
                    <IonIcon 
                        name='map-outline' 
                        size={36} 
                        style={{...globalStyles.fontShadow}}
                        onPress={() => navigation.navigate('CatchesMap')}
                    /> 
                }
            </View>
        </View>
    )
}

export default PlacesTabHeader

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