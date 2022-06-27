export const initialState = {
    title: { value: '' },
    length: { value: '', unit: 'IN' },
    weight: { value: '', unit: 'LB' },
    rig: { value: '' },
    species: { value: '' },
    publishType: { value: 'PUBLIC' },
    place: { _id: null, coordinates: null, snapshot: null },
    group: { _id: null },
    images: [],
    form: { isValid: false }
}

export const reducer = (state, action) => {
    if(action.type === 'TITLE'){
        const { title } = state;
        title.value = action.value;
        return { ...state, title }
    }
    if(action.type === 'WEIGHT'){
        const  { weight } = state;
        weight.value = action.value;
        return { ...state, weight }
    }
    if(action.type === 'WEIGHT_UNIT'){
        const { weight } = state;
        weight.unit = action.value;
        return { ...state, weight }
    }
    if(action.type === 'LENGTH'){
        const { length } = state;
        length.value = action.value;
        return { ...state, length }
    }
    if(action.type === 'LENGTH_UNIT'){
        const { length } = state;
        length.unit = action.value;
        return { ...state, length }
    }
    if(action.type === 'RIG'){
        const { rig } = state;
        rig.value = action.value;
        return { ...state, rig }
    }
    if(action.type === 'SPECIES'){
        const { species } = state;
        species.value = action.value;
        return { ...state, species }
    }
    if(action.type === 'PUBLISH_TYPE'){
        const { publishType } = state;
        publishType.value = action.value;
        return { ...state, publishType }
    }
    if(action.type === 'PLACE_ID'){
        const { place } = state;
        place._id = action.value;
        return { ...state, place }
    }
    if(action.type === 'COORDINATES'){
        const { place } = state;
        place.coordinates = action.value;
        return { ...state, place }
    }
    if(action.type === 'SNAPSHOT'){
        const { place } = state;
        place.snapshot = action.value;
        return { ...state, place }
    }
    if(action.type === 'RESET_PLACE'){
        const { place } = state;
        place.snapshot = null;
        place._id = null;
        place.coordinates = null;
        return { ...state, place }
    }
    if(action.type === 'GROUP'){
        const { group } = state;
        group._id = action.value;
        return { ...state, group }
    }
    if(action.type === 'IMAGES'){
        return { ...state, images: action.value }
    }
    if(action.type === 'IMAGE_REMOVE'){
        const { images } = state;
        const array = images.filter((_, index) => index !== action.value)
        return { ...state, images: array }
    }
    if(action.type === 'FORM_VALID'){
        const { form, title, length, weight, rig, species, images, group, place, publishType } = state;
        if(publishType.value === 'PUBLIC'){
            if(title.value.length > 2 || length.value.length > 0 || weight.value.length > 0 ||
            rig.value.length > 2 || species.length > 2 || images.length > 0 || group._id || 
            place.coordinates || place._id){
                form.isValid = true;
                return { ...state, form }
            }
        }else{
            form.isValid = true;
            return { ...state, form }
        }
    }
    if(action.type === 'EDIT'){
        const { title, length, weight, rig, species, place, publishType } = state;
        if(action.value?.title) title.value = action.value.title;
        if(action.value?.length) {
            length.value = action.value.length.value;
            length.unit = action.value.length.unit;
        }
        if(action.value?.weight){
            weight.value = action.value.weight.value;
            weight.unit = action.value.weight.unit;
        }
        if(action.value?.rig) rig.value = action.value.rig;
        if(action.value?.species) species.value = action.value.species;
        if(action.value?.place) place._id = action.value.place._id;
        if(action.value?.location) {
            place.coordinates = { 
                longitude: action.value.location.coordinates[0], 
                latitude: action.value.location.coordinates[1]
            }
        }
        if(action.value?.publish_type) publishType.value = action.value.publish_type;
        return { ...state, title, length, weight, rig, species, place, publishType }
    }
    if(action.type === 'RESET'){
        return initialState;
    }
    return { ...state }
}