import React, {useState, useRef, useEffect} from 'react';
import './CollectionItem.css'
import ItemPopup from './ItemPopup';

export interface CollectionItemProps{
    style: any;
    prefix: string;
    name: string;
    description: any; //ReactNode, idk
    imageLink: string;
    type: string;
    close: any; //function
    itemsOwned: number;
    onClick: any; //function
    chosen: boolean;
    bait: boolean;
    rare: boolean;
}

CollectionItem.defaultProps = {
    style: {},
    prefix: "you fished up some",
    name: "drops of water",
    description: "Unfortunately, it seems that most fishing games don't acknowledge the existence of these.",
    imageLink: "https://w7.pngwing.com/pngs/323/1020/png-transparent-water-desktop-zen-presentation-drop-sticker-thumbnail.png",
    type: "trash",
    close: ()=>{},
    itemsOwned: 0,
    onClick: ()=>{},
    chosen: false,
    bait: false,
    rare: false,
}

export default function CollectionItem (props: CollectionItemProps){
    const [itemPopups, setItemPopups]= React.useState(<></>)
    const [popupIsOpen, setPopupIsOpen] = React.useState(0)

    const getColor = (string: string)=>{
        if(string=="trash"){
            return "#601C1C"
        }
        if(string=="common"){
            return "#EBDA8E"
        }
        if(string=="uncommon"){
            return "#CCE8CC"
        }
        if(string=="rare"){
            return "#4C64C4"
        }
        if(string=="legendary"){
            return "#d590dd"
        }
    }

    const openInfo = ()=>{
        if(popupIsOpen==0){
            setItemPopups((
                <ItemPopup
                    name={props.name}
                    prefix={""}
                    description={props.description}
                    type={props.type}
                    imageLink={props.imageLink}
                    itemsOwned={props.itemsOwned}
                />
            ))
            setPopupIsOpen(1)
        }
        else{
            setItemPopups((
                <></>
            ))
            setPopupIsOpen(0)
        }
    }

    const clickHandler = ()=>{
        if(!props.bait){
            openInfo()
        }
        props.onClick()
        // console.log("item", props.name, "clicked!")
        // console.log("bait is", props.bait)
    }

    return (
    <div className='CollectionItem' style={{...{

    }, ...props.style}} onClick={clickHandler}>
        <div style={{
            objectFit: "cover",
            height: "40vh",
            width: "50vh",
            borderRadius: "10px",
            backgroundColor: "#2E211F",
            overflow: "hidden",
            marginTop: 0,
            position: "relative",
        }}>
            <div className="NameContainer" style={{
                position: "absolute",
                top: 4,
                left: 4,
                zIndex: 1,
                fontSize: 12,
                backgroundColor: "#000000CC",
                paddingTop: 4,
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
                borderRadius: 6,
                height: "fit-content",
                width: "fit-content",
                transformOrigin: "top left",
                transitionDuration: "0.5s", //TODO: replace this with animejs
                //transform: mouseIsOver ? "scale(2)" : "scale(1)",
                transformStyle: "preserve-3d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                    height: 12,
                    width: 12,
                    borderRadius: 4,
                    margin: 2,
                    marginRight: 4,
                    marginLeft: 2,
                    backgroundColor: getColor(props.type)
                }}>

                </div>
                <p style={{
                    margin: 0,
                    zIndex: 10,
                }}>
                    {props.rare?"special":props.type}
                </p>
            </div>
            {props.chosen && <div className="NameContainer" style={{
                position: "absolute",
                top: 4,
                right: 4,
                zIndex: 1,
                fontSize: 12,
                backgroundColor: "#FFB4F1",
                paddingTop: 2,
                paddingLeft: 4,
                paddingRight: 2,
                paddingBottom: 4,
                borderRadius: 6,
                height: "fit-content",
                width: "fit-content",
                transformOrigin: "top left",
                transitionDuration: "0.5s", //TODO: replace this with animejs
                //transform: mouseIsOver ? "scale(2)" : "scale(1)",
                transformStyle: "preserve-3d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <p style={{
                    margin: 0,
                    zIndex: 10,
                    color: "#000000"
                }}>
                    chosen
                </p>
            </div>}
            <div className="NameContainer" style={{
                position: "absolute",
                bottom: 4,
                left: 4,
                zIndex: 1,
                fontSize: 12,
                backgroundColor: "#000000CC",
                paddingTop: 4,
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
                borderRadius: 6,
                height: "fit-content",
                width: "fit-content",
                transformOrigin: "top left",
                transitionDuration: "0.5s", //TODO: replace this with animejs
                //transform: mouseIsOver ? "scale(2)" : "scale(1)",
                transformStyle: "preserve-3d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                    height: 12,
                    width: 12,
                    borderRadius: 4,
                    margin: 2,
                    marginRight: 4,
                    marginLeft: 2,
                    backgroundColor: getColor(props.type)
                }}>

                </div>
                <p style={{
                    margin: 0,
                    zIndex: 10,
                }}>
                    amount owned: {props.itemsOwned}
                </p>
            </div>
            <div>
                <img src={props.imageLink} style={{
                    objectFit: "cover",
                    height: "40vh",
                    width: "50vh",
                }}>
                </img>
            </div>
        </div>
        {itemPopups}
</div>
    )
}