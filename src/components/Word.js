import { React } from "react"; 

export function Word(props) {
    // display stripes below the hangman image to let user know how many letters need to be guessed
    return (
        <div className="word">
            {props.selectedWord
			.split('')
			.map((letter, i) => {
                return (
                    <span className="letter" key={i}>
                        {props.correctLetters.includes(letter) ? letter : ''}
                    </span>
                )
            })}
        </div>
    )
}