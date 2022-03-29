import React from 'react'
import profileReducer, { addPostActionCreator, deletePost } from './profileReducer'

let state = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: "7", src: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg" },
        { id: 2, message: "Yo :)", likesCount: "5", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRVTXjnVc3FBgGjnOqDqDL2Fb9X1yAv16Gg&usqp=CAU" },
        { id: 3, message: "Hello world!!!", likesCount: "3", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGyTMhdrDq9kv2A6hJmfjrKoybKZp477zXQ&usqp=CAU" }
    ]
};

test('the length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("react");
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(4);
})

test('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator("react");
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts[3].message).toBe("react");
})

test('the length of array after deleting should be decremented', () => {
    // 1. test data
    let action = deletePost(1);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(2);
})

test('the length of array after deleting should not be decremented if id is incorrect', () => {
    // 1. test data
    let action = deletePost(1000);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(3);
})
