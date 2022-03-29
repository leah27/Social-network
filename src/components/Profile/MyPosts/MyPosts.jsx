import React from 'react'
import c from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import { Element } from '../../Common/FormControls/FormControls'

const Textarea = Element("textarea");
const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {


    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} src={p.src} key={p.id} />)

    let newPostElement = React.createRef();


    let onAddPost = (values) => {
        props.addPost(values.newPostText);

    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <>
            <div>
                <h2>My posts</h2>
                <AddNewPostFormRedux onSubmit={onAddPost} />
                <div>New post</div>
            </div>
            {postsElements}
        </>

    )
}

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.wrap}>
            <Field name="newPostText" component={Textarea} validate={[required, maxLength10]} />
            <button className={c.new}>Add post</button>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)
export default MyPosts;