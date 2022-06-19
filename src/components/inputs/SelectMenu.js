import { StyleSheet, Platform, Modal, Text, View, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

const SelectMenu = ({ title, array, value, setValue, style }) => {

    const [platform] = useState(Platform.OS)
    const pickerRef = useRef()
    const [open, setOpen] = useState(false)  

    if(platform === 'ios'){
        return (
            <>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={{ ...styles.openModal, ...style}}>
                        <Text style={{ fontSize: 16 }}>{value}</Text>
                        <Icon name='menu-down' size={24} style={{ paddingLeft: 4 }}/>
                    </View>
                </TouchableOpacity>
                <Modal visible={open} animationType="slide"
                    transparent={true} onRequestClose={() => setOpen(false)}
                >
                    <BlurView style={styles.modal} intensity={20}>
                        <TouchableOpacity onPress={() => setOpen(false)} style={{ zIndex: 2 }}>
                            <Text style={styles.close}>Close</Text>
                        </TouchableOpacity>
                        <Picker style={{ ...styles.pickerIOS }} prompt={title}
                            itemStyle={{ ...styles.pickerItem }}
                            onValueChange={value => setValue(value)}
                            selectedValue={value} 
                        >
                            { array.map(opt => <Picker.Item key={opt} label={opt} value={opt}/>)}
                        </Picker>
                    </BlurView>
                </Modal>
           </>
        )
    }

    else if(platform === 'android'){
        return (
            <>
                <TouchableOpacity onPress={() => pickerRef.current.focus()}>
                    <View style={{ ...styles.openModal, ...style}}>
                        <Text style={{ fontSize: 16 }}>{value}</Text>
                        <Icon name='menu-down' size={24}/>
                    </View>
                </TouchableOpacity>
                <Picker style={{ ...styles.pickerAndroid}} prompt={title}
                    onValueChange={value => setValue(value)}
                    selectedValue={value} ref={pickerRef}
                >
                    { array.map(opt => <Picker.Item key={opt} label={opt} value={opt}/>)}
                </Picker>
            </>
        )
    }

    else{
        return null;
    }

}

export default SelectMenu;

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: '3%',
        height: '25%',
        width: '95%',
        borderRadius: 30,
        backgroundColor: 'rgba(224,224,224, .8)',
        elevation: 400,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    pickerIOS: {
        width: '100%'
    },
    pickerAndroid: {
        display: 'none'
    },
    openModal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    close: {
        position: 'absolute',
        top: 16,
        left: 16,
        fontSize: 16,
        color: 'rgb(120,120,120)'
    }
})