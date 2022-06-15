export const formatDateGroupList = (isoDate) => {
    const date = new Date(isoDate)
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - (1000*60*60*24)).toDateString()
    if (date.toDateString() === today){
        //this is today
        return `Today ${date.toLocaleTimeString([], { timeStyle: 'short' })}`
    }
    else if(date.toDateString() === yesterday){
        //date is yesterday
        return `Yesterday ${date.toLocaleTimeString([], { timeStyle: 'short' })}`
    }
    else{
        return date.toLocaleDateString([], { day: 'numeric', month: 'long' } )
    }
}

export const formatTimeMessage = (isoDate) => {
    const date = new Date(isoDate)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let timeOfDay = 'am'
    if(hour > 12) {
        hour = hour - 12;
        timeOfDay = 'pm'
    }
    if(minutes < 10){
        minutes = `0${minutes}`
    }
    return `${hour}:${minutes} ${timeOfDay}`
}