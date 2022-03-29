const SEND_MESSAGE = 'SEND-MESSAGE';

export type InitialStateType = typeof initialState
type DialogType = {
    id: number,
    user: string,
    src: string
}
type MessageType = {
    id: number,
    text: string
}

let initialState = {
    dialogs: [
        { id: 1, user: "User1", src: "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" },
        { id: 2, user: "User2", src: "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" },
        { id: 3, user: "User3", src: "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" },
        { id: 4, user: "User4", src: "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" },
        { id: 5, user: "User5", src: "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" },
    ] as Array<DialogType>,
    messages: [
        { id: 1, text: "How are you?" },
        { id: 2, text: "Yo..." },
        { id: 3, text: "Hey :)" }
    ] as Array<MessageType>
}



const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, text: body }]
            }

        default:
            return state;
    }


}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;