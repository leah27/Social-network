import React from 'react';
import style from './FormControls.module.css'
import { Field } from 'redux-form';
export const Element = Element => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : "")}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span> {meta.error} </span>}
        </div>
    );
};

// export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
//     <div>
//         <Field placeholder={placeholder}
//             name={name}
//             validate={validators}
//             component={component}
//             {...props}
//         />{text}
//     </div>
// }
