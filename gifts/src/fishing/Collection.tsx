import React from 'react';
import './Collection.css'
import {items} from './Data.js'
import CollectionItem from './CollectionItem';
import staticGif from '../assets/static.gif'

export interface CollectionProps {
    style: any;
    text: string;
    storage: any;
    close: any; //function
    bait: boolean;
    setBait: any;
}

Collection.defaultProps = {
    style: {},
    text: "viewing collection",
    storage: {},
    close: ()=>{},
    bait: false,
    setBait: ()=>{},
}

export default function Collection (props: CollectionProps){
    const data = items;
    let gridItems: any = [];
    const [chosenItem, setChosenItem] = React.useState("no bait");
    
    for (const [key, value] of Object.entries(data)){
        if(!props.bait){
            for(const element of value){
                if(props.storage[element.name]>0){
                    gridItems.push(
                        <CollectionItem
                            prefix={element.prefix}
                            name={element.name}
                            description={element.description}
                            imageLink={element.image_link}
                            type={key}
                            itemsOwned={props.storage[element.name]}
                            chosen={chosenItem == element.name}
                            onClick={()=>{if(props.bait){setChosenItem(element.name)}}}
                            bait={false}
                            rare={element.item_rarity==1?true:false}
                        />
                    )
                }
                else{
                    gridItems.push(
                        <CollectionItem
                            prefix={element.prefix}
                            name={"unknown item"}
                            description={"You don't know what this item is yet."}
                            imageLink={staticGif}
                            type={key}
                            itemsOwned={props.storage[element.name]}
                            style={{
                                filter: "brightness(20%)",
                            }}
                            bait={true}
                        />
                    )
                }
            }
        }
        else{
            for(const element of value){
                if(props.storage[element.name]>1 && element.item_rarity==0){
                    gridItems.push(
                        <CollectionItem
                            prefix={element.prefix}
                            name={element.name}
                            description={element.description}
                            imageLink={element.image_link}
                            type={key}
                            itemsOwned={props.storage[element.name]}
                            chosen={chosenItem == element.name}
                            onClick={()=>{if(props.bait){setChosenItem(element.name)}}}
                            bait={true}
                        />
                    )
                }
            }
        }    
    }
    return (
        <div className="CollectionWeapper" style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000CC",
            zIndex: 11,
        }}>
            <div className='Collection' style={{...{
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                overflow: "scroll",
            }, ...props.style}}>
                <div style={{
                    height: "40vh",
                    width: "50vh",
                    backgroundColor: "#000000AA",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }} onClick={()=>{props.setBait(chosenItem);props.close();}}>
                    <p style={{
                        textAlign: "center",
                        fontSize: 30,
                        margin: 0,
                    }}>{props.text}</p>
                    {props.bait && (<p style={{
                        margin: 0,
                        textAlign: "center",
                    }}>
                        chosen item: {chosenItem}
                    </p>)}
                    <p style={{
                        textAlign: "center",
                        fontSize: 14,
                        margin: 0,
                    }}>click to {props.bait?"submit choice":"close"}</p>
                </div>
                <div style={{
                    height: "40vh",
                    width: "50vh",
                    backgroundColor: "#000000AA",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                }} onClick={()=>{setChosenItem("no bait")}}>
                    <p style={{
                        textAlign: "center",
                        fontSize: 30,
                        margin: 0,
                        zIndex: 2,
                    }}>remove bait</p>
                    <img style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        filter: "brightness(20%)"
                    }} src={staticGif}>
                    </img>
                </div>
                {gridItems}
            </div>
        </div>
    )
}