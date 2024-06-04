import React from "react";
import './Badge.scss';
import classNames from "classnames";


function Badge ({color, onClick, className}) {

    return (
        <i onClick={onClick} className={classNames('badge', {[`badge--${color}`]: color}, className)}></i>
    )
}


export default Badge;