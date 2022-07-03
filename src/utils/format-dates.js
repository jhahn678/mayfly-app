import moment from 'moment'


export const formatDateGroupList = (isoDate) => {
    return moment(isoDate).calendar()
}

export const formatTimeMessage = (isoDate) => {
    return moment(isoDate).format('h:mm a')
}

export const formatCreatedAt = (value) => {
    const date = moment(value)
    if(date){
        return date.format('M/D/YYYY [at] h:mm a')
    }else{
        const num = parseInt(msDateString)
        const isoString = new Date(num)
        return moment(isoString).format('M/D/YYYY [at] h:mm a')
    }
}   

export const formatProfileCreatedAt = (value) => {
    const date = moment(value)
    if(date){
        return date.format('M/D/YY')
    }else{
        const num = parseInt(msDateString)
        const isoString = new Date(num).toISOString()
        return moment(isoString).format('M/D/YY')
    }
}
