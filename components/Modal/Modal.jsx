import React from 'react';
import style from './Modal.module.css';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ setClose, children }) {
    return(
        <div className={style.modal_wrapper} onClick={() => setClose()}>
            <div className={style.modal_inner} onClick={e => e.stopPropagation()}>
                <div className={style.close_button} onClick={() => setClose()}>
                    <FaTimes></FaTimes>
                </div>
                {React.Children?.map(children, child => {
                    if(React.isValidElement(child))
                        return React.cloneElement(child);
                    return child;
                })}
            </div>
        </div>
    )
}