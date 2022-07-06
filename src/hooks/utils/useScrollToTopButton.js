import { useState, useRef } from 'react'


export const useScrollToTopButton = () => {

    const flatListRef = useRef()

    const [showScrollButton, setShowScrollButton] = useState(false)

    const onScroll = ({ nativeEvent: { contentOffset: { y } }}) => {
        if(y > 600) return setShowScrollButton(true)
        if(y <= 600) return setShowScrollButton(false)
    }

    const handleScrollToTop = () => {
        flatListRef.current.scrollToOffset({ offset: 0 })
    }

    return{
        flatListRef,
        showScrollButton,
        onScroll,
        handleScrollToTop
    }
}