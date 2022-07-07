import { gql, useSubscription } from '@apollo/client'

export const GROUP_SUBSCRIPTION = gql`
    subscription Subscription($groupId: ID!) {
        messageCreated(groupId: $groupId) {
            _id
            user {
                _id
                details {
                    avatar {
                        url
                    }
                    username
                    fullName
                }
            }
            createdAt
            media {
                url
            }
            body
            type
            place {
                _id
                locality
                avatar {
                    url
                }
                name
                location {
                    coordinates
                }
            }
            catch {
                _id
                title
                species
                media {
                    url
                }
            }
        }
    }
`

export const groupSubscription = (groupId) => ({
    document: GROUP_SUBSCRIPTION,
    variables: { groupId },
    updateQuery: (prev, { subscriptionData }) => { 
        if(!subscriptionData.data.messageCreated) return prev;
        
        // We will concatenate the new message onto the old array of
        // messages and modify the previous query with that
        const newMessage = subscriptionData.data.messageCreated
        const messagesArrayOld = prev.getGroup.messages;
        const messagesArrayNew = [ ...messagesArrayOld, newMessage ] 
        
        const { getGroup } = prev;
        //Destructure query and reassign messages value to new array
        return { ...prev, getGroup: { ...getGroup, messages: messagesArrayNew } }
    }
}) 

export const useGroupSubscription = (groupId) => {
    const result = useSubscription(GROUP_SUBSCRIPTION, {
        variables: { groupId }
    })
    return result;
}