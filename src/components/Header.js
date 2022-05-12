import { React } from "react"; 

export function Header(props) {
    // display simple header with player's name
    return (
        <div className="header">
            <h1>Hangman</h1>
            <p>Hi {props.name}, find the hidden word! Enter a letter 😁</p>
        </div>
    )
}