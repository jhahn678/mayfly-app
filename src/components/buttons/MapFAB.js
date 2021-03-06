import { StyleSheet } from 'react-native'
import { FAB } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'


const MapFAB = ({ mapOptions, style }) => {

    const navigateToMap = useNavigateToMap()

    return (
        <FAB onPress={() => navigateToMap({...mapOptions})} 
            style={{...styles.fab, ...style}}
            icon={<Icon name='map-outline' size={24} color='#fefefe'/>}
            ViewComponent={({ children }) => (
                <LinearGradient style={styles.view}
                    colors={['#06beb6','#48b1bf']} 
                    start={{ x: 0, y: 0 }} 
                    end={{ x: 1, y: 1 }}
                >{children}
                </LinearGradient>
            )}
        />
    )
}

export default MapFAB;

const styles = StyleSheet.create({
    view: {
        height: 56,
        width: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        elevation: 12,
        shadowColor: 'black',
        shadowOffset: { height: 6 },
        shadowOpacity: .4,
        shadowRadius: 4
    }
})