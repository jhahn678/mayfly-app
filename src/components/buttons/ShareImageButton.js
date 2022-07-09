import Icon from 'react-native-vector-icons/Ionicons'
import { useImageContext } from '../../store/context/image'
import { useImagePicker } from '../../hooks/utils/useImagePicker'

const ShareImageButton = () => {

    const { setChatImages } = useImageContext()
    const openImagePicker = useImagePicker()

    const handleOnPress = async () => {
        const { cancelled, type, ...image } = await openImagePicker()
        if(cancelled === false) setChatImages(images => [...images, image])
    }

    return (
        <Icon name='images-outline' size={28} color='#032836' onPress={handleOnPress}/>
    )
}

export default ShareImageButton
