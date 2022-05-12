import './App.css';
import axios from 'axios';
import { React, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from './components/Nav.js';
import { Header } from './components/Header.js';
import { Form } from './components/Form.js';
import { Figure } from './components/Figure.js';
import { WrongLetters } from './components/WrongLetters';
import { Word } from './components/Word';
import { Notification } from './components/Notification.js';
import { Popup } from './components/Popup.js';
import { Instructions } from './components/Instructions.js';
import { Show } from './components/Show.js'
import { showNotification as show } from './helpers/helpers.js';
import { minLength, maxLength, wrongTries } from './constants/constants.js'; 

function App() {
  // call API for random words with minlength 5 & maxlength 10
  // code using axios was provided by RapidApi
  // this API call is dependent on variable resetGame
  // if resetGame changes, execute the code within this useEffect hook
  const [resetGame, setResetGame] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://random-words5.p.rapidapi.com/getRandom',
      params: {minLength: '5', maxLength: '10'},
      headers: {
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
        'X-RapidAPI-Key': '9eb2d42ff5msh1b24b10e0b5ead9p149210jsn7a46b5bf07a0'
      }
    };
          
    axios.request(options).then(function (response) {
      setIsLoaded(true);
      setSelectedWord(response.data);
    }).catch(function (error) {
      setIsLoaded(true);
      setError(error);
    });
  }, [resetGame])

  // listen for the event of keydown to check whether letter is a valid letter in the alphabet
  // and whether letter is already typed (in either correctLetters of wrongLetters)
    // if that is the case, show notification that letter is already used
  // this API call is dependent on variable selectedWord, correctLetters, wrongLetters & playable
  // if any of these variables change, execute the code within this useEffect hook
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [selectedWord, correctLetters, wrongLetters, playable]);

  // reset game
  // change reset variable (doesn't matter whether its true or false) 
  // because then the first useEffect hook (API call) is executed
  function playAgain() {
    setCorrectLetters([]);
    setWrongLetters([]);
    setPlayable(true);
    let reset = resetGame ? false : true;
    setResetGame(reset);
  }

  // set name, headline & disabled on /set-name URL 
  // remove any typed letters within correctLetters & wrongLetters array
  // that have been typed in because the name of the player was typed in
  const [name, setName] = useState('Player');
  const [headline, setHeadline] = useState('What is your name?');
  const [disabled, setDisabled] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setHeadline(`Hello, ${name}! Lets play the game 😁`);
    setDisabled(true);
    setCorrectLetters([]);
    setWrongLetters([]);
  }

  // handle change of text input to fill in your name
  // save this value for the player name
  function handleChange(e) {
    e.preventDefault();    
    setName(`${e.target.value}`);
  }

  // use function to map all images within images folder to an array
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  // if API call does not return error and a word is loaded, return the body of the page
  if (!error && isLoaded) {
    return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <>
              <Nav/>
              <div className='wrapper' id='home'>
                <Header name={name}/>
                <div className='game-container'>
                  <Figure wrongLetters={wrongLetters} images={images}/>
                  <WrongLetters wrongLetters={wrongLetters}/>
                  <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
                </div>
                <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
                <Notification showNotification={showNotification}/>
              </div>
            </>
          } />
          <Route path="/instructions" element={
            <>
              <Nav/>
              <div className='wrapper'>
                <Instructions minLength={minLength} maxLength={maxLength} wrongTries={wrongTries}/>
              </div>
            </>
          } />
          <Route path="/show-word" element={
            <>
              <Nav/>
              <div className='wrapper'>
                <Show selectedWord={selectedWord}/>
              </div>
            </>
          } />
          <Route path="/set-name" element={
              <>
              <Nav/>
              <div className='wrapper'>
                <Form headline={headline} handleChange={handleChange} handleSubmit={handleSubmit} disabled={disabled} images={images}/>
              </div>
              </>
          } />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
