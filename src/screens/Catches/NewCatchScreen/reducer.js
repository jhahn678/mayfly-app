export const initialState = {
    title: { value: '' },
    length: { value: '', unit: 'IN' },
    weight: { value: '', unit: 'LB' },
    rig: { value: '' },
    species: { value: '' },
    place: { value: '', isValid: false },
    group: { value: '', isValid: false },
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
    if(action.type === 'PLACE'){
        const { place } = state;
        place.value = action.value;
        return { ...state, place }
    }
    if(action.type === 'PLACE_VALID'){
        const { place } = state;
        place.value = action.value
        return { ...state, place }
    }
    if(action.type === 'GROUP'){
        const { group } = state;
        group.value = action.value;
        return { ...state, group }
    }
    if(action.type === 'GROUP_VALID'){
        const { group } = state;
        group.value = action.value;
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
        const { form } = state;
        form.isValid = action.value;
        return { ...state, form }
    }
    return { ...state }
}