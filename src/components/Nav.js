import { React } from "react";
import { Link } from "react-router-dom"; 
import '../App.css';

export function Nav() {
    // link to different paths
    return (
        <nav>
            <Link to="/set-name"><h4>Set name</h4></Link>
            <Link to="/show-word"><h4>Show word</h4></Link>
            <Link to="/"><h4>Play game</h4></Link>
            <Link to="/instructions"><h4>Instructions</h4></Link>
        </nav>
    )
}