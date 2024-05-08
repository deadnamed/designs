import React from 'react';
import './ItemPopup.css'
import anime from 'animejs';

export interface ItemPopupProps {
    style: any;
    prefix: string;
    name: string;
    description: any; //ReactNode, idk
    imageLink: string;
    type: string;
    close: any; //function
}

ItemPopup.defaultProps = {
    style: {},
    prefix: "you fished up some",
    name: "drops of water",
    description: "Unfortunately, it seems that most fishing games don't acknowledge the existence of these.",
    imageLink: "https://w7.pngwing.com/pngs/323/1020/png-transparent-water-desktop-zen-presentation-drop-sticker-thumbnail.png",
    type: "extraordinarily common",
    close: ()=>{},
}

export default function ItemPopup (props: ItemPopupProps){
    const maskRef=React.useRef<HTMLDivElement>(null!)
    const getColor = (string: string)=>{
        if(string=="extraordinarily common"){
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
    React.useEffect(()=>{
        anime({
            targets: ".ItemPopupMask",
            width: "100vw",
        })
    })
    return (
        <div className='ItemPopupMask' ref={maskRef} style={{
            height: "100vh",
            width: "0vw",
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden",
            zIndex: 4,
        }}>
        <div className='ItemPopup' style={{...{
            height: "100vh",
            width: "100vw",
            // position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "#000000DD",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }, ...props.style}} onClick={props.close}>
            <p>
            {props.prefix}
            </p>
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
                    }}>
                        {props.type}
                    </p>
                </div>
                <img src={props.imageLink} style={{
                    objectFit: "cover",
                    height: "40vh",
                    width: "50vh",
                }}>
                </img>
            </div>
            <p style={{
                fontSize: "3em",
                margin: 0,
                textAlign: "center",
            }}>
            {props.name}
            </p>
            <div style={{
                marginTop: 0,
            }}>
                <p style={{
                    fontSize: "1em",
                    margin: 0,
                    textAlign: "center",
                }}>{props.description}</p>
            </div>
        </div>
        </div>
    )
}