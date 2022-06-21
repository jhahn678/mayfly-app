import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from '@rneui/themed'

const AvatarChip = ({ style, avatarSize=24, avatarUri, title }) => {
    return (
        <View style={{...styles.container, ...style }}>
            <Avatar source={{ uri: avatarUri }} size={avatarSize} rounded/>
            <Text style={{ fontSize: 12, paddingHorizontal: 4 }}>{title}</Text>
        </View>
    )
}

export default AvatarChip

const styles = StyleSheet.create({
    container: {
        padding: 6,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(230,230,230)',
    }
})