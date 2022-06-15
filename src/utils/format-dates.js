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