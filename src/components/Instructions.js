import { React } from "react"; 

export function Instructions(props) {
    // display instructions of the game
    return (
        <div className="instructions">
            <h1>Instructions</h1>
            <p>The idea is to guess the word one letter at a time.</p>
            <p>The word is randomly chosen and has a length of minimally {props.minLength} and maximally {props.maxLength} letters.</p>
            <p>You guess the word by typing in a letter on your keyboard. </p>
            <p>For every wrongly guessed letter, it appears in the 'wrong letters' box in the top right corner.</p>
            <p>You'll get a notification if you've typed in a letter you've already guessed.</p>
            <p>After {props.wrongTries} wrong tries you lose the game.</p>
        </div>
    )
}