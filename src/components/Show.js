import { React } from "react"; 

export function Show(props) {
    // function that displays the word
    return (
        <div className="show-word">
            <h1>Show word (cheater 😉!)</h1>
            <p>{props.selectedWord}</p>
        </div>
    )
}