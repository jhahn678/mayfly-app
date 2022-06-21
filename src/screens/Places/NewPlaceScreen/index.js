import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native'
import { useEffect, useReducer, useState } from 'react'
import PrimaryBackground from '../../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../../components/headers/CreateHeader'
import { useRoute, useNavigation } from '@react-navigation/core'
import { FAB, Input } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap'
import { useImagePicker } from '../../../hooks/utils/useImagePicker'
import { useImageContext } from '../../../store/context/image'
import { initialState, reducer } from '../../Places/NewPlaceScreen/reducer'
import { globalStyles } from '../../../styles/globalStyles'
import CameraFAB from '../../../components/buttons/CameraFAB'
import GalleryFAB from '../../../components/buttons/GalleryFAB'
import FlatListImage from '../../../components/image/FlatListImage'


const NewPlaceScreen = () => {

  const { width: screenWidth } = Dimensions.get('screen')
  const [formState, dispatch] = useReducer(reducer, initialState)

  const route = useRoute()
  const navigation = useNavigation()
  const navigateToMap = useNavigateToMap()

  useEffect(() => {
    if(route.params?.coordinates){
      dispatch({ type: 'COORDINATES', value: route.params.coordinates })
    }
    if(route.params?.image){
      dispatch({ type: 'SNAPSHOT', value: route.params.image })
    }
  },[])

  const openImagePicker = useImagePicker()
  const { placeImages: imagesFromCamera, setPlaceImages } = useImageContext()
  const [imagesFromGallery, setImagesFromGallery] = useState([])

  const handleAddImageFromGallery = async () => {
    const { cancelled, ...image } = await openImagePicker()
    if(!cancelled) setImagesFromGallery(i => [
      ...i, 
      {...image, id: uuid.v4(), origin: 'GALLERY' }
    ])
  }

  useEffect(() => {
    const images = [...imagesFromGallery, ...imagesFromCamera]
    dispatch({ type: 'IMAGES', value: images })
  },[imagesFromCamera, imagesFromGallery])


  const removeImage = (imageIndex) => {
    if(formState.images[imageIndex].origin === 'CAMERA'){
      setPlacesImages(images => images.filter(i => i.id !== formState.images[imageIndex].id ))
    }
    if(formState.images[imageIndex].origin === 'GALLERY'){
      setImagesFromGallery(images => images.filter(i => i.id !== formState.images[imageIndex].id ))
    }
  }

  const handleComplete = async () => {
    try{
      //Upload snapshot?
      const { images } = formState;
      const uploadedImages = images.map(async (image) => {
        const { data } = await uploadImageToCloudinary(image)
        return { id: data.public_id, url: data.secure_url }
      })
      // { id: data.public_id, url: data.secure_url }
      // create new place
      setPlaceImages([])
    }catch(err){
      alert('Something went wrong!')
    }
  }

  return (
    <PrimaryBackground style={{ ...styles.container, ...globalStyles.boxShadowTop }}>
        <CreateHeader title='New Location' 
          onGoBack={() => setPlaceImages([])} rightNode={(
          <FAB disabled={!formState?.form.isValid}
            icon={<IonIcon name='return-down-forward' size={24} color='#fefefe'/>} 
            style={{ ...styles.doneIcon }} 
            disabledStyle={{ backgroundColor: 'rgba(220,220,220,.3)', opacity: .5 }}
            onPress={handleComplete}
          />
        )}/>

        <ScrollView style={styles.list} contentContainerStyle={{ padding: '5%' }}>
          <Input containerStyle={styles.titleInput} value={formState?.name.value}
            inputStyle={styles.inputStyle} placeholder='Title'
            onTextInput={value => dispatch({ type: 'NAME', value: value })}
          />
          { formState?.images.length === 0 ?
            <View style={styles.iconContainer}>
              <Image source={{ uri: formState?.snapshot.image }} resizeMode='cover' 
                style={{ height: '100%', width: '100%', borderRadius: 30 }} 
              />
            </View> :
            <FlatList horizontal={true} data={formState.images} style={styles.imageFlatList}
              renderItem={({ item, index }) => (
                <FlatListImage image={item} 
                  clearImage={() => removeImage(index)}
                  style={{ height: 300, width: (screenWidth*.9)}}
                />
              )}
              pagingEnabled={true}
              keyExtractor={item => item.uri}
            />
          }
          <GalleryFAB onPress={handleAddImageFromGallery} style={styles.galleryButton}/>
          <CameraFAB style={styles.cameraButton}/>
        </ScrollView>
    </PrimaryBackground>
  )
}

export default NewPlaceScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleInput: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 24
  },
  list: {
    flexGrow: 0,
    height: '85%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#fefefe',
  },
  doneIcon: {
    marginRight: 8
  },
  iconContainer: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    backgroundColor:'rgb(230,230,230)',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageFlatList: {
    height: 300,
    width: '100%',
    borderRadius: 30
  },  
  doneIcon: {
    marginRight: 8
  },
  cameraButton: {
    position: 'absolute',
    right: 12,
    top: 364
  },
  galleryButton: {
    position: 'absolute',
    right: 76,
    top: 364
  },
  subtitle: {
    color: 'rgb(90,90,90)',
    fontSize: 20,
    marginTop: 36,
    marginBottom: 16,
  }
})