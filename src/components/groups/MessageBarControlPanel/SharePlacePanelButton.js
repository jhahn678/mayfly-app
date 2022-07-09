import PanelIconButton from './PanelIconButton'
import { useNavigation } from '@react-navigation/core'
import FontelloIcon from '../../icons/Fontello'

const SharePlacePanelButton = () => {
  
    
    const navigation = useNavigation()

    return (
        <PanelIconButton label='Share a location'
            onPress={() => navigation.navigate('Places')} 
            icon={<FontelloIcon name='map' size={40} color='#fefefe'/>}
        />
    )
}

export default SharePlacePanelButton
