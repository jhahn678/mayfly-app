import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import BaseFAB from '../../buttons/BaseFAB';
import { useRoute, useNavigation } from '@react-navigation/native';

const ExploreTabHeader = ({}) => {

    const route = useRoute()
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.title}>Explore</Text>
                { route.name === 'GlobalMap' ?
                    <BaseFAB 
                        onPress={() => navigation.navigate('GlobalFeed')}
                        icon={<IonIcon size={24} name='list-outline' color='#fefefe'/>} 
                    /> :
                    <BaseFAB 
                        onPress={() => navigation.navigate('GlobalMap')}
                        icon={<IonIcon size={24} name='map-outline' color='#fefefe'/>}        
                    />
                }
            </View>
        </View>
    )
}

export default ExploreTabHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight:24,
        paddingBottom: 12
    },
    title: {
        fontSize: 32,
        fontWeight: '400',
        color: '#fefefe'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})