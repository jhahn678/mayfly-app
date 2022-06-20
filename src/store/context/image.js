import { useContext, useState, createContext } from "react";

const initialState = {
    catchImages: [{ height: 4000, width: 3000, uri: 'file:///data/user', base64: '443f4agq3' }],
    setCatchImages: () => {},
    placeImages: [{ height: 4000, width: 3000, uri: 'file:///data/user', base64: '443f4agq3' }],
    setPlaceImages: () => {},
    chatImages: [{ height: 4000, width: 3000, uri: 'file:///data/user', base64: '443f4agq3' }],
    setChatImages: () => {},
};

const ImageContext = createContext(initialState)

export const ImageContextProvider = ({ children }) => {

    const [catchImages, setCatchImages] = useState([])
    const [placeImages, setPlaceImages] = useState([])
    const [chatImages, setChatImages] = useState([])

    const removeChatImage = (uri) => {
        setChatImages(images => images.filter(i => i.uri !== uri))
    }


    return (
        <ImageContext.Provider value={{ 
            catchImages, setCatchImages, 
            placeImages, setPlaceImages, 
            chatImages, setChatImages, removeChatImage 
        }}>
            {children}
        </ImageContext.Provider>
    )
}

export const useImageContext = () => useContext(ImageContext)