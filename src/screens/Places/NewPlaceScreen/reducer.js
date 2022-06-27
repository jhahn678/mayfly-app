export const initialState = {
    name: { value: '' },
    description: { value: '' },
    location: { coordinates: { latitude: null, longitude: null } },
    avatar: { unsaved: null, saved: null },
    images: [],
    publishType: { value: 'PUBLIC' },
    group: { _id: null },
    form: { isValid: false }
}

export const reducer = (state, action) => {
    if(action.type === 'NAME'){
        const { name } = state;
        name.value = action.value;
        return { ...state, name }
    }
    if(action.type === 'DESCRIPTION'){
        const { description } = state;
        description.value = action.value;
        return { ...state, description }
    }
    if(action.type === 'COORDINATES'){
        const { location } = state;
        location.coordinates = action.value
        return { ...state, location }
    }
    if(action.type === 'SNAPSHOT'){
        const { avatar } = state;
        avatar.unsaved = { base64: action.value }
        return { ...state, avatar }
    }
    if(action.type === 'IMAGES'){
        return { ...state, images: action.value }
    }
    if(action.type === 'REMOVE_IMAGE'){
        const { images } = state;
        const array = images.filter((_, index) => index !== action.value)
        return { ...state, images: array }
    }
    if(action.type === 'GROUP'){
        const { group, publishType } = state;
        group._id = action.value;
        publishType.value = 'SHARED'
        return { ...state, group, publishType }
    }
    if(action.type === 'PUBLISH_TYPE'){
        const { publishType } = state;
        if(action.value === 'PUBLIC' || action.value === 'PRIVATE' || action.value === 'SHARED'){
            publishType.value = action.value;
        }
        return { ...state, publishType }
    }
    if(action.type === 'FORM'){
        const { form, coordinates, avatar, name } = state;
        if(publishType.value === 'PUBLIC' && coordinates.longitude 
            && coordinates.latitude && name.value.length > 0 && (avatar.unsaved || avatar.saved)
        ){
            form.isValid = true;
        }
        if(publishType !== 'PUBLIC' && coordinates.longitude && coordinates.latitude){
            form.isValid = true;
        }else{
            form.isValid = false;
        }
        return { ...state, form }
    }
    if(action.type === 'EDIT'){
        const { name, description, location, avatar, group, publishType } = state;
        if(action.value?.name) name.value = action.value.name;
        if(action.value?.description) description.value = action.value.description;
        if(action.value?.location) location.coordinates = action.value.location.coordinates;
        if(action.value?.avatar) avatar.saved = action.value.avatar;
        if(action.value?.publishType !== 'SHARED') publishType.value = action.value.publish_type;
        if(action.value?.group) group._id = action.value.group;
        return { ...state, name, description, location, group, avatar, publishType }; 
    }
    if(action.type === 'RESET'){
        return {...initialState};
    }
    return {...state};
}