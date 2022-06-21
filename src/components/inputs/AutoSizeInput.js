import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'
import { useTextInputAutosize } from '../../hooks/utils/useTextInputAutosize'

const AutoSizeInput = ({ containerStyle, inputStyle, titleStyle, placeholder, value, onChangeText, verticalPadding=8, title }) => {

    const { onContentSizeChange, inputHeight } = useTextInputAutosize()

    return (
        <View style={containerStyle}>
            {title &&
                <Text style={{...styles.title, ...titleStyle }}>{title}</Text>
            }
            <View style={{ ...styles.container, height: inputHeight + (2*verticalPadding) }}>
                <TextInput onContentSizeChange={args => onContentSizeChange(args)}
                    style={{ ...styles.input, ...inputStyle, height: inputHeight }}
                    multiline={true} onChangeText={value => onChangeText(value)} value={value}
                    placeholder={placeholder} placeholderTextColor='rgba(53, 52, 64, .3)'
                />
            </View>
        </View>
    )
}

export default AutoSizeInput

const styles = StyleSheet.create({
    title: {
        color: 'rgb(90,90,90)',
        fontSize: 20,
        marginBottom: 16
    },
    container: {
        borderColor: 'rgba(53, 52, 64, .3)',
        borderWidth: 1,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        paddingHorizontal: 12,
        fontSize: 16
    }
})