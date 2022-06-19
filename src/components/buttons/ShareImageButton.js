import { StyleSheet } from 'react-native'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles'
import { useImageContext } from '../../store/context/image'
import { useImagePicker } from '../../hooks/utils/useImagePicker'

const ShareImageButton = () => {

    const { setImages } = useImageContext()
    const openImagePicker = useImagePicker()

    const handleOnPress = async () => {
        const { cancelled, type, ...image } = await openImagePicker()
        if(cancelled === false) setImages(images => [...images, image])
    }

    return (
        <FAB size='small' buttonStyle={styles.button}
            icon={<Icon name='images-outline' size={18}/>}
            style={{...styles.FAB, ...globalStyles.FABshadow}}
            onPress={handleOnPress}
        />
    )
}

export default ShareImageButton

const styles = StyleSheet.create({
})