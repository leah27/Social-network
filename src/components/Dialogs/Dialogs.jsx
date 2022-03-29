import React from 'react';
import c from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Messages/Message'
import { updateNewMessageBodyCreator, sendMessageCreator } from '../../redux/dialogsReducer'
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form'
import { Element } from '../Common/FormControls/FormControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Textarea = Element("textarea");
const maxLength100 = maxLengthCreator(100)

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem user={d.user} id={d.id} key={d.id} src={d.src} />)
    let messagesElements = state.messages.map(m => <Message text={m.text} key={m.id} />)
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }
    // if (!props.isAuth) return <Redirect to='/login' />
    return (
        <div>
            <div className={c.dialogs}>
                <div className={c.dialogsItem}>

                    {dialogsElements}

                </div>
                <div className={c.messages}>

                    <div>{messagesElements}</div>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>

            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form className={c.send} onSubmit={props.handleSubmit}>
            <Field component={Textarea} name='newMessageBody' placeholder='Enter your message'
                validate={[required, maxLength100]} />
            <button>SEND</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;