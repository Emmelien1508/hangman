import { React, useEffect } from "react"; 
import { checkWin } from "../helpers/helpers";

export function Popup(props) {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    // check for win and set final message on that condition
    if (checkWin(props.correctLetters, props.wrongLetters, props.selectedWord) === 'win') {
        finalMessage = 'Congratulations, you won! 😁';
        playable = false;
    } else if (checkWin(props.correctLetters, props.wrongLetters, props.selectedWord) === 'lose') {
        finalMessage = 'Sorry, you lost! 🙁';
        finalMessageRevealWord = `The word was ${props.selectedWord}`;
        playable = false;
    }

    useEffect(() => props.setPlayable(playable))
    return (
        <div className="popup-container" style={finalMessage !== '' ? {display: 'flex'} : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <p>{finalMessageRevealWord}</p>
                <button onClick={props.playAgain}>Play Again</button>
            </div>
        </div>
    )
}