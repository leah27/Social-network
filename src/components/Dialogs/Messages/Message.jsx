import React from 'react';
import c from '../Dialogs.module.css'


const Message = (props) => {

    return (

        <div className={c.message} >
            {props.text}

        </div>


    )
}

export default Message;