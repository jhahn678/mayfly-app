import { useState } from 'react'


export const useTextInputAutosize = () => {

    const [contentSizeHeight, setContentSizeHeight] = useState(0)

    const onContentSizeChange = (event) => {
        setContentSizeHeight(event.nativeEvent.contentSize.height + 16)
    }

    return {
        inputHeight: contentSizeHeight,
        onContentSizeChange
    }
}