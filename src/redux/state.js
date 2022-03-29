import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { message: "Hi, how are you?", likesCount: "7", src: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg" },
                { message: "Yo :)", likesCount: "5", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRVTXjnVc3FBgGjnOqDqDL2Fb9X1yAv16Gg&usqp=CAU" },
                { message: "Hello world!!!", likesCount: "3", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGyTMhdrDq9kv2A6hJmfjrKoybKZp477zXQ&usqp=CAU" }
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 1, user: "Stesha", src: "https://cdn2.vectorstock.com/i/1000x1000/78/61/cute-bapig-cartoon-sitting-vector-1797861.jpg" },
                { id: 2, user: "Giuseppa", src: "https://thumbs.dreamstime.com/b/avatar-pig-avatar-pig-white-background-vector-illustration-105121788.jpg" },
                { id: 3, user: "Pickles", src: "https://thumbs.dreamstime.com/b/avatar-pig-avatar-pig-white-background-vector-illustration-105121788.jpg" },
                { id: 4, user: "Patrick", src: "https://img.favpng.com/7/16/2/domestic-pig-cartoon-png-favpng-JZZjmM4JUy6fQgYdS83UkgG4L.jpg" },
                { id: 5, user: "Elizabeth", src: "https://cdn2.vectorstock.com/i/1000x1000/78/61/cute-bapig-cartoon-sitting-vector-1797861.jpg" },
                { id: 6, user: "Peter", src: "https://cdn1.vectorstock.com/i/1000x1000/74/00/cute-pig-cartoon-posing-vector-16947400.jpg" },
            ],
            messages: [
                { id: 1, text: "How are you?" },
                { id: 2, text: "Yo..." },
                { id: 3, text: "Hey :)" }

            ],
            newMessageBody: ""
        }

    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    _callSubscriber() {
        console.log('State changed')
    },


    // addPost() {
    //     let newPost = {
    //         id: 5,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0,
    //         src: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg"
    //     };
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._callSubscriber(this._state);
    // },
    // updateNewPostText(newText) {

    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber(this._state)
    // },

    dispatch(action) { //action is an object. ex: {type: 'ADD-POST'}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);


    }

}



export default store;
window.store = store;