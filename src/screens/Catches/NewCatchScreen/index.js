import { StyleSheet, Text, View, ScrollView, Dimensions,
TouchableOpacity, KeyboardAvoidingView, FlatList} from 'react-native'
import uuid from 'react-native-uuid'
import { useEffect, useState, useReducer } from 'react'
import PrimaryBackground from '../../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../../components/headers/CreateHeader'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar, FAB, Input } from '@rneui/themed'
import { useImagePicker } from '../../../hooks/utils/useImagePicker'
import { useImageContext } from '../../../store/context/image'
import SelectMenu from '../../../components/inputs/SelectMenu'
import { weightEnum, lengthEnum } from '../../../utils/select-enums'
import { reducer, initialState } from './reducer'
import FontelloIcon from '../../../components/icons/Fontello'
import { useNavigation, useRoute } from '@react-navigation/core'
import { makeFakeGroupWithPlaces } from '../../../../test-data/groups'
import { uploadImageToCloudinary } from '../../../utils/cloudinary'
import FlatListImage from '../../../components/image/FlatListImage'
import { CheckBox } from "@rneui/themed";
import AddLocationPanel from '../../../components/catches/AddLocationPanel'
import { useAuthContext } from '../../../store/context/auth'
import CameraFAB from '../../../components/buttons/CameraFAB'
import LocationPreview from '../../../components/catches/LocationPreview'
import { globalStyles } from '../../../styles/globalStyles'


const NewCatchScreen = () => {
  
  const { user } = useAuthContext()
  const [formState, dispatch] = useReducer(reducer, initialState)
  const { width: screenWidth } = Dimensions.get('screen')

  //Replace with group query
  const [group] = useState(makeFakeGroupWithPlaces())

  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    if(route?.params?.placeId){
      dispatch({ type: 'PLACE_ID', value: route.params.placeId })
    }
    if(route?.params?.coordinates){
      dispatch({ type: 'COORDINATES', value: route.params.coordinates })
    }
    if(route?.params?.image){
      dispatch({ type: 'SNAPSHOT', value: route.params.image })
    }
    if(route?.params?.groupId){
      dispatch({ type: 'GROUP', value: route.params.groupId })
    }
  },[route])

  const openImagePicker = useImagePicker()
  const { catchImages: imagesFromCamera, setCatchImages } = useImageContext()
  const [imagesFromGallery, setImagesFromGallery] = useState([])

  useEffect(() => {
    const images = [...imagesFromGallery, ...imagesFromCamera]
    dispatch({ type: 'IMAGES', value: images })
  },[imagesFromCamera, imagesFromGallery])

  const handleAddImages = async () => {
    const { cancelled, ...image } = await openImagePicker()
    if(!cancelled) setImagesFromGallery(i => [
      ...i, 
      {...image, id: uuid.v4(), origin: 'GALLERY' }
    ])
  }

  const removeImage = (imageIndex) => {
    if(formState.images[imageIndex].origin === 'CAMERA'){
      setCatchImages(images => images.filter(i => i.id !== formState.images[imageIndex].id ))
    }
    if(formState.images[imageIndex].origin === 'GALLERY'){
      setImagesFromGallery(images => images.filter(i => i.id !== formState.images[imageIndex].id ))
    }
  }
  
  const handleComplete = async () => {
      try{
        const { images } = formState;
        const uploadedImages = images.map(async (image) => {
          const { data } = await uploadImageToCloudinary(image)
          return { id: data.public_id, url: data.secure_url }
        })
        // create new catch
        setCatchImages([])
      }catch(err){
        alert('Something went wrong!')
      }
  }

  return (
    <PrimaryBackground style={styles.container}>

      <CreateHeader title='New Catch' 
        onGoBack={() => setCatchImages([])} rightNode={(
        <FAB disabled={!formState?.form.isValid}
          icon={<IonIcon name='return-down-forward' size={24} color='#fefefe'/>} 
          style={{ ...styles.doneIcon }} 
          disabledStyle={{ backgroundColor: 'rgba(220,220,220,.3)', opacity: .5 }}
          onPress={handleComplete}
        />
      )}/>

      <ScrollView style={{ ...styles.list, ...globalStyles.boxShadowTop }} contentContainerStyle={{ padding: '5%' }}>
        <Input containerStyle={styles.titleInput} value={formState?.title.value}
          inputStyle={styles.inputStyle} placeholder='Title'
          onTextInput={value => dispatch({ type: 'TITLE', value: value })}
        />
        { formState?.images.length === 0 ?
          <TouchableOpacity style={styles.iconContainer} onPress={handleAddImages}>
            <MCIcon name='image-plus' size={64} color='#605856'/>
          </TouchableOpacity> :
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
        <CameraFAB style={styles.cameraButton}/>



        { !formState?.group._id &&
          <View style={styles.checkboxContainer}>
            <Text style={styles.subtitle}>Publish</Text>
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
            <Text style={{ fontSize: 12, position: 'absolute', bottom: -8 }}>
              { formState?.publishType.value === 'PUBLIC' ? 
                'Your catch will be saved and posted publicly' : 
                'Your catch will only be saved to your catch log'
              }
            </Text>
          </View>
        }


        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.subtitle}>Add a location</Text>
          { formState?.group._id &&
            <View style={styles.avatarChip}>
              <Avatar source={{ uri: group.avatar.url }} size={24} rounded/>
              <Text style={{ fontSize: 12, paddingHorizontal: 4 }}>{group.name}</Text>
            </View>
          }
        </View>
        { (formState?.place._id || formState?.place.coordinates) ? (
              <LocationPreview placeId={formState.place._id} 
                coordinates={formState.place.coordinates}
                snapshot={formState.place.snapshot}
                onRemove={() => dispatch({ type: 'RESET_PLACE'})}
              />
            ) : (
              formState?.group._id ?
              <AddLocationPanel groupId={group._id} numberOfSavedLocations={group.places.length}/> :
              <AddLocationPanel userId={group._id} numberOfSavedLocations={group.places.length}/>
            )
        }
  


        <Text style={styles.subtitle}>Details</Text>
        <Input placeholder='Describe your rig' value={formState?.rig.value}
          leftIcon={<FontelloIcon name='fishing-rod' color='rgb(100,100,100)' size={20}/>}
          onTextInput={value => dispatch({ type: 'RIG', value: value })}
          containerStyle={styles.fullWidthInput} inputStyle={{ paddingLeft: 4 }}
        />
        <Input placeholder='Species of fish' value={formState?.species.value}
          leftIcon={<FontelloIcon name='fish' color='rgb(100,100,100)' size={24}/>}
          onTextInput={value => dispatch({ type: 'SPECIES', value: value })}
          containerStyle={styles.fullWidthInput} inputStyle={{ paddingLeft: 4 }}
        />
        <KeyboardAvoidingView style={styles.measurements}>
          <Input inputStyle={{ paddingLeft: 4}} placeholder='Length'
            leftIcon={<MCIcon name='ruler' color='rgb(100,100,100)' />}
            containerStyle={styles.measurementInput} value={formState?.length.value}
            onTextInput={value => dispatch({ type: 'LENGTH', value: value })}
          />
          <SelectMenu title='Length' array={lengthEnum}
            value={formState?.length.unit} style={styles.picker}
            setValue={value => dispatch({ type: 'LENGTH_UNIT', value: value })}
          />
          <Input placeholder='Weight' value={formState?.weight.value}
            leftIcon={<MCIcon name='scale' color='rgb(100,100,100)'/>}
            containerStyle={styles.measurementInput} inputStyle={{ paddingLeft: 4}}
            onTextInput={value => dispatch({ type: 'WEIGHT', value: value })}
          />
          <SelectMenu title='Weight' array={weightEnum} 
            value={formState?.weight.unit} style={styles.picker}
            setValue={value => dispatch({ type: 'WEIGHT_UNIT', value: value })}
          />
        </KeyboardAvoidingView>

      </ScrollView>

    </PrimaryBackground>
  )
}

export default NewCatchScreen;

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
  fullWidthInput: {
    width: '100%',
    height: 70
  },
  measurementInput: {
    width: '32%',
  },
  measurements: {
    height: 70,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  picker: {
    height: '80%',
    paddingBottom: 18,
    alignSelf: 'flex-end'
  },
})