import React, {useState, useRef, useEffect} from 'react';
import './Template.css'

export interface TemplateProps {
    style: any;
}

Template.defaultProps = {
    style: {},
}

export default function Template (props: TemplateProps){
    return (
    <div className='Template' style={{...{

    }, ...props.style}}>

    </div>
    )
}