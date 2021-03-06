import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, Image } from 'react-native'
import { useEffect, useReducer, useState } from 'react'
import PrimaryBackground from '../../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../../components/headers/CreateHeader'
import { useRoute, useNavigation } from '@react-navigation/core'
import { FAB, Input, CheckBox } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useImagePicker } from '../../../hooks/utils/useImagePicker'
import { useImageContext } from '../../../store/context/image'
import { initialState, reducer } from '../../Places/NewPlaceScreen/reducer'
import { globalStyles } from '../../../styles/globalStyles'
import CameraFAB from '../../../components/buttons/CameraFAB'
import GalleryFAB from '../../../components/buttons/GalleryFAB'
import FlatListImage from '../../../components/image/FlatListImage'
import AvatarChip from '../../../components/chip/AvatarChip'
import { uploadImageToCloudinary } from '../../../utils/cloudinary'
import { makeFakeGroup, makeFakePlaces } from '../../../../test-data/groups'
import AutoSizeInput from '../../../components/inputs/AutoSizeInput'
import uuid from 'react-native-uuid';


const NewPlaceScreen = () => {


  //Replace with group query
  const [group] = useState(makeFakeGroup())

  const route = useRoute()
  const navigation = useNavigation()

  const { width: screenWidth } = Dimensions.get('screen')
  const [formState, dispatch] = useReducer(reducer, initialState)

  const openImagePicker = useImagePicker()
  const { placeImages: imagesFromCamera, setPlaceImages } = useImageContext()
  const [imagesFromGallery, setImagesFromGallery] = useState([])
  const [savedImages, setSavedImages] = useState([])

  
  useEffect(() => {
    if(route.params?.placeId){
      // return (async () => {
      //   //fetch place
      // })()
      const place = makeFakePlaces(1)[0]
      dispatch({ type: 'EDIT', value: place })
      const savedImages = place.media.map(m => ({ ...m, uri: m.url, origin: 'SAVED' }))
      setSavedImages(savedImages)
    }
    if(route.params?.coordinates){
      dispatch({ type: 'COORDINATES', value: route.params.coordinates })
    }
    if(route.params?.image){
      dispatch({ type: 'SNAPSHOT', value: route.params.image })
    }
    if(route.params?.groupId){
      dispatch({ type: 'GROUP', value: route.params.groupId })
    }
  },[])

  
  
  const handleAddImageFromGallery = async () => {
    const { cancelled, ...image } = await openImagePicker()
    if(!cancelled) setImagesFromGallery(i => [
      ...i, 
      {...image, id: uuid.v4(), origin: 'GALLERY' }
    ])
  }

  
  useEffect(() => {
    const images = [...imagesFromGallery, ...imagesFromCamera, ...savedImages]
    dispatch({ type: 'IMAGES', value: images })
  },[imagesFromCamera, imagesFromGallery, savedImages])

  
  const removeImage = async (index) => {
    if(formState.images[index].origin === 'CAMERA'){
      setPlacesImages(images => images.filter(i => i.id !== formState.images[index].id ))
    }
    if(formState.images[index].origin === 'GALLERY'){
      setImagesFromGallery(images => images.filter(i => i.id !== formState.images[index].id ))
    }
    if(formState.images[index].origin === 'SAVED'){
      //REMOVE IMAGE FROM CLOUDINARY
      setSavedImages(images => images.filter(i => i.id !== formState.images[index].id ))
    }
  }

  const onGoBack = () => {
    setPlaceImages([])
    dispatch({ type: 'RESET' })
  }

  const handleComplete = async () => {
    try{
      //Upload snapshot?
      const { images, avatar } = formState;
      let savedAvatar;
      if(avatar.unsaved){
        const { data: uploadedAvatar } = await uploadImageToCloudinary(avatar.unsaved)
        savedAvatar = { id: uploadedAvatar.public_id, url: uploadedAvatar.secure_url }
      }
      const media = images.map(async (image) => {
        if(image.origin !== 'SAVED'){
          const { data } = await uploadImageToCloudinary(image)
          return { id: data.public_id, url: data.secure_url }
        }else{
          return { id: image.id, url: image.url }
        }
      })
      //savedAvatar, media
      //create new place
      const groupId = formState.group._id
      setPlaceImages([])
      dispatch({ type: 'RESET' })
      const history = navigation.getState().routes
      const navigatedFrom = history[history.length - 2].name
      navigation.navigate(navigatedFrom, { 
        placeId: 'NEW PLACE ID HERE', 
        groupId: (groupId || null)
      })
    }catch(err){
      console.log(err)
      alert('Something went wrong!')
    }
  }

  return (
    <PrimaryBackground style={{ ...styles.container, ...globalStyles.boxShadowTop }}>
        <CreateHeader title='New Location' 
          onGoBack={onGoBack} rightNode={(
          <FAB disabled={formState?.form.isValid}
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
              <Image source={{ uri: formState?.avatar.saved?.url || `data:image/jpg;base64,${formState?.avatar.unsaved?.base64}`}} 
                resizeMode='cover' style={{ height: '100%', width: '100%', borderRadius: 30 }} 
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


          <View style={styles.checkboxContainer}>
            <Text style={styles.subtitle}>Publish</Text>
            { formState.group._id  ?
              <AvatarChip avatarUri={group.avatar.url} style={{ marginLeft: 16 }} title={group.name}/> : <>
              <CheckBox title="Public" checkedColor='#0eaaa7'
                checkedIcon="dot-circle-o" uncheckedIcon="circle-o"
                checked={formState?.publishType.value === 'PUBLIC'}
                onPress={() => dispatch({ type: 'PUBLISH_TYPE', value: 'PUBLIC' })}
                containerStyle={{ marginLeft: 32, width: 80 }} 
                textStyle={{ marginRight: 0, marginLeft: 8 }}
              />
              <CheckBox title="Private" checkedColor='#0eaaa7'
                checkedIcon="dot-circle-o" uncheckedIcon="circle-o"
                checked={formState?.publishType.value === 'PRIVATE'}
                onPress={() => dispatch({ type: 'PUBLISH_TYPE', value: 'PRIVATE' })}
                containerStyle={{ width: 80 }} 
                textStyle={{ marginRight: 0, marginLeft: 8 }}
              />
            </>}
              <Text style={{ fontSize: 12, position: 'absolute', bottom: -12 }}>
                { formState?.publishType.value === 'PUBLIC' ? 
                  'This location will be shared on the public map' : 
                  formState?.publishType.value === 'PRIVATE' ? 
                  'Only you will be able to view this location' : 
                  `This location will only be shared with ${group.name}`
                }
              </Text>
          </View>


          <AutoSizeInput value={formState?.description.value} placeholder='Description'
            onChangeText={(value) => dispatch({ type: 'DESCRIPTION', value: value})}
            containerStyle={styles.descriptionContainer} inputStyle={styles.descriptionInput}
            title='Description'
          />


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
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  avatarChip: {
    marginTop: 36,
    marginLeft: 8,
    marginBottom: 16,
    padding: 6,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(230,230,230)',
  },
  descriptionContainer: {
    marginTop: 48
  }
})