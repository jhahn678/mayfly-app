import { gql, useSubscription } from '@apollo/client'

export const MESSAGE_SUBSCRIPTION = gql`
    subscription Subscription($groupId: ID!) {
        messageCreated(groupId: $groupId) {
            _id
            user {
                _id
                details {
                    username
                    firstName
                    avatar {
                        url
                    }
                }
            }
            type
            body
            createdAt
        }
    }
`

export const messageSubscription = (groupId) => ({
    document: MESSAGE_SUBSCRIPTION,
    variables: { groupId },
    updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData.data.messageCreated) return prev;

        //We will look through our cached query and find the group in the
        //groups array. Then we will overwrite its latest_message and 
        //save it to the cache
        console.log('messageCreated was non null')
        //prev groups array filtered
        const filteredGroups = prev.getUser.groups.filter(g => g._id !== groupId)
        //group item to be updated
        const group = prev.getUser.groups.find(g => g._id === groupId)
        const updatedGroup = { ...group, latest_message: subscriptionData.data.messageCreated }
        const updatedGroups = [ ...filteredGroups, updatedGroup ]
        //Return query with latest_message on group updated
        return { getUser: { ...prev.getUser, groups: updatedGroups } }
    }
}) 

export const useMessageSubscription = (groupId) => {
    const result = useSubscription(MESSAGE_SUBSCRIPTION, {
        variables: { groupId }
    })
    return result;
}