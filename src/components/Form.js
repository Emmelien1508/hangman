import { React } from "react"; 
import { Link } from "react-router-dom"; 

export function Form(props) {
    if (props.disabled) {
        // if form is disabled, display headline with player's name & happy hangman character image
        const title = props.headline.split('!')[0];
        const subtitle = props.headline.split('!')[1].slice(1);
        return (
            <div className="flex-centered">
                <h1>{title}!</h1>
                <Link to='/'><button className="pink-btn">{subtitle}</button></Link>
                <img className="small-figure wrapper" src={props.images['win.png']} alt="Hangman Figure"></img>
            </div>
        )
    } else {
        // else return form to ask for user's name
        return (
            <form onSubmit={props.handleSubmit}>
                <h1>{props.headline}</h1>
                <input type="text" placeholder={props.name} onChange={props.handleChange}></input>
                <button type="submit">Submit</button>
            </form>
        )
    }
}