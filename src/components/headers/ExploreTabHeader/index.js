import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

const ExploreTabHeader = ({}) => {

    const route = useRoute()
    const navigation = useNavigation()

    return (
        <View style={styles.headerContent}>
            <Text style={{...styles.title, ...globalStyles.fontShadow }}>Explore</Text>
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
    )
}

export default ExploreTabHeader

const styles = StyleSheet.create({
    headerContent: {
        width: '100%',
        height: '12%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12
    },
    title: {
        fontSize: 32,
        fontWeight: '400',
        color: '#353440'
    }
})