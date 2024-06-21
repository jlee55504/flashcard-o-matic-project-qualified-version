/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useEffect, useState } from 'react';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
/* Imports the 'useParams', 'Link', and the 'useNavigate' 'components' from 
'react-router-dom'. */
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';
/* Imports the "readDeck" and the "createCard" 'functions/components'
 from '../utils/api/index.js'. */
import { createCard, readDeck } from '../utils/api/index';

import AddEditCards from './AddEditCards';
/* The "AddCard" 'function/component' allows users to add a "card" to the 
specific "deck" and 'local server'. */
function AddCard() {
    /* The "deckId" 'variable' is extracted using the 'useParams' 'component'. */
    const { deckId } = useParams();
    /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
    using the 'useState' (which is set to an empty 'string' ("")). */
    const [deckName, setDeckName] = useState("");
    /* The "frontCardText" 'variable' and the "setFrontCardText" 'function' 
    are 'declared' using the 'useState' (which is set to an empty 'string' ("")). */
    const [frontCardText, setFrontCardText] = useState("");
    /* The "backCardText" 'variable' and the "setBackCardText" 'function' 
    are 'declared' using the 'useState' (which is set to an empty 'string' ("")). */
    const [backCardText, setBackCardText] = useState("");
     /* The "abortcontroller" holds a 'new AbortController' 'method'. */
    const abortController = new AbortController();
    /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
    const navigate = useNavigate();

//    const [AddEditCardCardId, setAddEditCardCardId] = useState(deckId);

    const [deck, setDeck] = useState([]);
    const [waitToAddCard, setWaitToAddCard] = useState(false);

    /* This 'useEffect' 'component' runs only once when the web page first loads. 
     The 'async function' "getDeck" uses the "readDeck" with 'await' 
    with the "deckId" 'variable' and "abortController.signal" for 'arguments' 
    (which is stored in the "selectedDeck" 'variable') and the "setDeckName" 
    'function' is 'called' with the "selectedDeck" 'variable's' "name" 'key' 
    'value'. Finally, the "getDeck" 'function' is 'called'. This code lists the 
    "deck" name for the 'Link' 'element' that displays users the "Deck.js" 'file' 
    using the specific "deck". */
    useEffect(() => {    
        async function getDeck() {
            try {
                const selectedDeck = await readDeck(deckId, abortController.signal);
                setDeck(selectedDeck);
                setDeckName(selectedDeck.name);
            }catch (error) { 
                console.error(error); 
            } 
        } getDeck();
        return () => abortController.abort(); 
    }, [deckName]);
    

 /*   useEffect(() => {  
         if (waitToAddCard) { 
            async function createCardData() { 
                try { 
                    await createCard(deckId, {front: frontCardText, back: backCardText}, abortController.signal);
                    setFrontCardText("");
                    setBackCardText("");
                     } catch (error) { 
                        console.error(error); 
                    }
                 } createCardData(); 
                } return () => abortController.abort();
            }, [waitToAddCard]);*/

    /* The "handleChange" 'function' that takes an 'object' 'parameter' named 
    "target" that first checks if the "target" 'parameter's' 'name' 'attribute' is 
    equal to "AddCard-front-text". If so, the "setFrontCardText" is 'called' with
     the "target" 'parameter's' 'value' as its 'argument'. Next, the "target" 
     'parameter's' 'name' 'attribute' is equal to "AddCard-back-text", the 
     "setBackCardText" 'function' is 'called' with the "target" 'parameter's' 
     'value' as its 'argument'. This code 'sets' the "frontCardText" and the 
     "backCardText" 'variables' are 'set' with the data the user inputs. */
    const handleChange = ({ target }) => {
        if (target.name === "AddCard-front-text") setFrontCardText(target.value);
        else if (target.name === "AddCard-back-text") setBackCardText(target.value);
    }

    /* The "handleSubmit" 'function' takes a 'parameter' named "event". The 
    'method' 'preventDefault' is 'called' with the "event" 'parameter'. Then, the
     "createCard" 'function' is 'called' with the "deckId" 'variable', a 
     'object', and "abortController.signal" as its 'argument'. The 'object' 
     contains 'key' named "front" with the "frontCardText" 'variable's' 'value' 
     and a 'key' named "back" 'value' using the 'Number' 'method', a "front" 'key'
      with the "frontCardText" 'variable' as its 'value', a and a "back" 'key' 
      with the "backCardText" 'variable' as its 'value'. The "setFrontCardText" 
      and "setBackCardText" 'functions' are 'called' with empty 'strings' as 
      'arguments'. This code creates a "card" 'object' for the specifified "deck" 
      and the 'local server'. */
    const handleSubmit = event => {
        event.preventDefault();
        setWaitToAddCard(true); 
    }

    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
     an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
     " / ", a 'Link' JSX 'element' to the  the 'link' to the "Deck.js" 
    'file' that displays the current "deck", and the 'text' " / Add Card ". 
    Two 'h2' JSX 'elements' follow the "nav-bar" 'div'. The first displays the 
    'value' of the "deckName" 'variable'. The second displays the 'text' 
    "Add Card". A 'form' JSX 'element' follows with the "handlesubmit" 'function' 
    as the 'value' for its 'onSubmit' 'value'. Inside are two 'label' JSX 
    'elements' and two 'button' JSX 'elements'. The first 'label' JSX 'element' 
    has the 'text' Front" while the other has the 'text' "Back". Both 'label' JSX 
    'elements' hold 'textarea' JSX 'elements' with the "handleChange" 'function' 
    as the 'value' for its 'onChange' 'function' for the 'value' of its 
    'onChange' 'attributes'. Two 'button' JSX 'elements' follow; the first has the
     'text' "Done" and the "navigate" 'variable' with "/decks/" plus the 'value' 
     of the "deckId" for the argument. The second 'button' JSX 'element' has the 
     'text' "Submit". This code This code holds the 'links' to the "Home page" and 
     "Deck.js" which displays the proper info fo the specifified "deck" 'file' and
      a 'form' to 'add' a new "card" 'object' to the specified "deck" and 
      'local server'.  */

    return (
        <div>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>Home </Link> / <Link to={`/decks/${deckId}`}> {deckName}</Link> / Add Card</div>
        <h2 className='AddCard-deck-name-h2'> {deckName}: </h2><h2 className='AddCard-add-card-h2'> Add Card</h2>
               {/* <form onSubmit={handleSubmit}>
                    <label htmlFor='AddCard-front-text'>
                        Front<textarea id="AddCard-front-text" name="AddCard-front-text" 
                        placeholder='Front side of card' onChange={handleChange}  
                        value={frontCardText} required ></textarea>
                    </label>
                    <label htmlFor='AddCard-back-text'>
                        Back<textarea id="AddCard-back-text" name="AddCard-back-text" 
                        placeholder='Back side of card' onChange={handleChange} value={backCardText} 
                        required ></textarea>
                    </label>
                <button type="button" className='AddCard-done-btn btn btn-secondary' 
                onClick={() => navigate(`/decks/${deckId}`)} >Done</button>
                <button type='submit' className='AddCard-submit-btn btn btn-primary' >Save</button>
                </form> 
                <AddEditCards cardId={null}  />
                */}
                <Routes>
            <Route path="/new/*" element={<AddEditCards />} />
         </Routes>
            </div>
    );
}

/* Exports the "AddCard" 'function/component'. */
export default AddCard;