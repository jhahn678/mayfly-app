import PanelIconButton from './PanelIconButton'
import { useNavigation } from '@react-navigation/core'
import FontelloIcon from '../../icons/Fontello'

const ShareCatchPanelButton = () => {

    const navigation = useNavigation()

    return (
        <PanelIconButton label='Share a saved catch'
            onPress={() => navigation.navigate('NewCatch')} 
            icon={<FontelloIcon name='fish' size={40} color='#fefefe'/>}
        />
    )
}

export default ShareCatchPanelButton
