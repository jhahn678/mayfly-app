import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import FlatListImage from './FlatListImage'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CameraFAB from '../buttons/CameraFAB'

const ImageFlatList = ({ images, horizontal=true, clearImage, onAddImage, flatlistStyle }) => {
    return (
        <View>
        { images.length === 0 ?
            <TouchableOpacity style={{...styles.iconContainer }} onPress={onAddImage}>
                <MCIcon name='image-plus' size={64} color='#605856'/>
            </TouchableOpacity> :
            <FlatList horizontal={horizontal} data={images} 
                style={{ ...styles.imageFlatList, ...flatlistStyle}}
                renderItem={({ item, index }) => (
                <FlatListImage image={item} 
                    clearImage={() => clearImage(index)}
                    style={{ height: 300, width: (screenWidth*.9)}}
                />
                )}
                pagingEnabled={true}
                keyExtractor={item => item.uri}
            />
            }
            <CameraFAB style={styles.cameraButton}/>
        </View>
    )
}

export default ImageFlatList

const styles = StyleSheet.create({
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
})