import React from 'react'
import c from './Post.module.css'

const Post = (props) => {
    return (
        <>
            <div className={c.wrap}>
                <img className={c.avatar} src={props.src} />
                <p>{props.message}</p>
                <div>
                    <span>{props.likesCount} Like</span>
                </div>
            </div>
        </>
    )
}

export default Post;