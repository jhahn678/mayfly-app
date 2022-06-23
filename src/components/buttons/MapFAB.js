import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { globalStyles } from '../../styles/globalStyles'

const MapFAB = ({ mapOptions, style }) => {

    const navigateToMap = useNavigateToMap()

    return (
        <FAB onPress={() => navigateToMap({...mapOptions})} 
            style={{...globalStyles.FABshadow, ...style}}
            icon={<Icon name='map-outline' size={24} color='#fefefe'/>}
        />
    )
}

export default MapFAB;