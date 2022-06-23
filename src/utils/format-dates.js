import moment from 'moment'

export const formatDateGroupList = (isoDate) => {
    return moment(isoDate).calendar()
}

export const formatTimeMessage = (isoDate) => {
    return moment(isoDate).format('h:mm a')
}

export const formatCreatedAt = (isoDate) => {
    return moment(isoDate).format('M/D/YYYY [at] h:mm a')
}   
