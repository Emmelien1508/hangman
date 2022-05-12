import { React } from "react"; 

export function WrongLetters(props) {
    // this is a box where all the wrongly guessed letters are displayed
    // map reduce checks whether there is a previous letter in the array of wrongLetters
    // if that is the case, add a comma to seperate these letters
    // else, it means that that is the first letter and don't display comma after it
    return (
        <div className="wrong-letters-container">
            <div>
                <h3>Wrong letters</h3>
                {props.wrongLetters
                    .map((letter, i) => <span key={i}>{letter}</span>)
                    .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)
                }
            </div>
        </div>
    )
}