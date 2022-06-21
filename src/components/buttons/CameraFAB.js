import { FAB } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/core'

const CameraFAB = ({ color='#fefefe', iconSize=24, style }) => {

    const navigation = useNavigation()

    return (
        <FAB icon={<IonIcon name='camera' size={iconSize} color={color}/>} 
          style={{ ...globalStyles.FABshadow, ...style }} 
          onPress={() => navigation.navigate('Camera')}
        />
    )
}

export default CameraFAB
