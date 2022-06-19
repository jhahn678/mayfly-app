import { useContext, useState, createContext } from "react";

const initialState = {
    images: [{ height: 4000, width: 3000, uri: 'file:///data/user', base64: '443f4agq3' }],
    setImages: (image) => {},
    removeImage: (uri) => {},
    clearImage: () => {}
};

const ImageContext = createContext(initialState)

export const ImageContextProvider = ({ children }) => {

    const [images, setImages] = useState([])

    const removeImage = (uri) => {
        setImages(images => images.filter(i => i.uri !== uri))
    }

    const clearImages = () => setImages([])

    return (
        <ImageContext.Provider value={{ images, setImages, removeImage, clearImages }}>
            {children}
        </ImageContext.Provider>
    )
}

export const useImageContext = () => useContext(ImageContext)