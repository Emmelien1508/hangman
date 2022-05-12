import { React } from "react"; 

export function Figure(props) {
    const errors = props.wrongLetters.length;
    let displayImgSrc;
    if (errors === 0) {
        // if there are no errors, display a happy hangman character image
        displayImgSrc = <img className="small-figure-empty-state" src={props.images['win.png']} alt="Hangman figure"></img>
    } else {
        // otherwise display partial hangman image
        displayImgSrc = <img src={props.images[`${errors + 1}.png`]} alt="Hangman figure"></img>
    }
    return (
        <div className="hangman-figure flex-centered wrapper">{displayImgSrc}</div>
    )
}