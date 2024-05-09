import React, {useState, useRef, useEffect} from 'react';
import './Collection.css'
import {items} from './Data.js'
import CollectionItem from './CollectionItem';

export interface CollectionProps {
    style: any;
    text: string;
    storage: any;
}

Collection.defaultProps = {
    style: {},
    text: "viewing collection",
    storage: {},
}

export default function Collection (props: CollectionProps){
    const data = items;
    let gridItems: any = [];
    
    for (const [key, value] of Object.entries(data)){
        for(const element of value){
            gridItems.push(
                <CollectionItem
                    prefix={element.prefix}
                    name={element.name}
                    description={element.description}
                    imageLink={element.image_link}
                    type={key}
                    itemsOwned={props.storage[element.name]}
                />
            )
        }    
    }
    return (
        <div className='Collection' style={{...{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            height: "100vh",
            width: "0vw",
            position: "fixed",
            top: 0,
            left: 0,
        }, ...props.style}}>
            {gridItems}
        </div>
    )
}