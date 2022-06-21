import { FAB } from '@rneui/themed'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { globalStyles } from '../../styles/globalStyles'

const CameraFAB = ({ color='#fefefe', iconSize=24, style, onPress }) => {

    return (
        <FAB icon={<MCIcon name='image-plus' size={iconSize} color={color}/>} 
          style={{ ...globalStyles.FABshadow, ...style }} 
          onPress={onPress}
        />
    )
}

export default CameraFAB