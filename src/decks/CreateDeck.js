/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useState, useEffect } from 'react';
/* Imports the 'useParams', 'Link', and the 'useNavigate' 'components' from 
'react-router-dom'. */
import { useParams, useNavigate, Link } from 'react-router-dom';
/* Imports the "readDeck", "updateCard", and the "readCard" 'functions/components'
 from '../utils/api/index.js'. */
import { readDeck, updateCard, readCard } from '../utils/api/index';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';

/* The "EditCard" 'function/component' displays the "nav-bar" 'div'. which 
(contains a 'links' to the "Home page" ('src/Layout/index.js')) and "Deck.js" 
(which displays the specified "decks" info) and a 'form' which allows users to 
'edit' and update the 'text' of the specified "card" in the specified "deck". */
function EditCard() {
  /* The "deckId" and the "cardId" 'variables' are extracted using the 'useParams'
   'component'. */
  const { deckId, cardId } = useParams();
  /* The "frontCardText" 'variable' and the "setFrontCardText" 'function' are 
  'declared' using the 'useState' (which is set to an empty 'string' ("")). */
  const [frontCardText, setFrontCardText] = useState("");
  /* The "backCardText" 'variable' and the "setBackCardText" 'function' are 
  'declared' using the 'useState' (which is set to an empty 'string' ("")). */
  const [backCardText, setBackCardText] = useState("");
  /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
  const navigate = useNavigate();
  /*The "deck" 'variable' and the "setDeck" 'function' are declared 
    using the 'useState' 'component' with an empty 'object' ('{}') as its argument.  */
  const [deck, setDeck] = useState({});
  /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
  using the 'useState' 'component' with an empty 'string' ("") as its argument. */
  const [deckName, setDeckName] = useState("");
  /* The "card" 'variable' and the "setCard" 'function' are 'declared' using the 
  'useState' (which is set to an empty 'string' ("")). */
  const [card, setCard] = useState({});
  /* The "waitForCardToUpdate" 'variable' and the "setWaitForCardToUpdate" 
  'function' are 'declared' using the 'useState' (which is set to 'false'). */
  const [waitForCardToUpdate, setWaitForCardToUpdate] = useState(false); 
  /* The "abortcontroller" holds a 'new AbortController' 'method'. */
  const abortController = new AbortController();

  /* This 'useEffect' 'component' runs every time the "card" and 'variable' 
  change using the 'async function' "getDeck" which calls the "readDeck" 
  'function/component' using 'await' with the "deckId" 'variable'and 
  "abortController.signal" as its arguments (which is stored in the 
    "currentDeck" 'variable'). The "deck" 'variable' is then 'set' with 
    data retrieved from the "selectedDeck" 'variable', the "deckName" 
    'variable' is 'set' with the "setDeckName" 'function' using the "currentDeck"
     'variable's' "name" 'key' 'value', the "readCard" 'function/component' is 
     'called' with the "cardId" 'variable' and "abortController.signal" for 
     'arguments' (which is stored in the "currentCard" 'variable') and the "card"
      'variable' is set with the "cards" 'key' from the "currentCard" 'variable's'
       'value' using the "setCard" 'function'. This code 'updates' the user's 
       screen to show the 'link' to the "Deck.js" 'file' of the selected "deck".
        The "handleChange" 'function' that takes an 'object' 'parameter' named 
    "target" that first checks if the "target" 'parameter's' 'name' 'attribute' is 
    equal to "EditCard-front-text". If so, the "setFrontCardText" is 'called' with
     the "target" 'parameter's' 'value' as its 'argument'. Next, the "target" 
     'parameter's' 'name' 'attribute' is equal to "EditCard-back-text", the 
     "setBackCardText" 'function' is 'called' with the "target" 'parameter's' 
     'value' as its 'argument'. This code 'sets' the "frontCardText" and the 
     "backCardText" 'variables' are 'set' with the data the user inputs. The 
     "handleSubmit" 'function' takes a 'parameter' named "event". The 'method' 
     'preventDefault' is 'called' with the "event" 'parameter'. Then, the
     "setCard" 'function' is 'called' with an 'object' as its 'argument'. The 
     'object' contains an "id" 'key' with the "card" 'variable's' "id" 'key' 
     'value' using the 'Number' 'method', a "front" 'key' with the "frontCardText"
      'variable' as its 'value', a "back" 'key' with the "backCardText" 'variable'
       as the 'value', and a "deckId" 'key' with the "card" 'variable's' "deckId" 
       'key' using the 'Number' 'method' as its 'value'. The 
       "setWaitForCardToUpdate" 'function' is 'called' with 'true' as its 
       'argument'. This code prevents the web page from 'reloading' after the 
       'form' is 'submitted', the "card" 'variable' is 'updated' to holds the info
        that the user 'inputs' and the "setWaitForCardToUpdate" is 'called' 
        which triggers the 'useEffect' the 'updates' the specific "card" on the 
         'local server'. */  
  useEffect(() => {
    async function getDeck() {
        const currentDeck = await readDeck(deckId, abortController.signal);
        setDeck(currentDeck);
        setDeckName(currentDeck.name)
        const currentCard = await readCard(cardId, abortController.signal);
        setCard(currentCard);
        } getDeck();
    }, [card]);

    /* This 'useEffect' 'component' runs every time the "waitForCardToUpdate" 
    'variable' changes. An 'if statement' checks if the "card" 'variable' is equal
     to an empty 'object' and the "waitForCardToUpdate" 'variable' is 'true'. If 
     so, the "updateCard" 'function/component' is 'called' with the "card" 
     'variable' and "abortController.signal" as 'arguments', the 
     "setWaitForCardToUpdate" 'function' is 'called' with 'false' as its 'value', 
     the "setFrontCardText" and "setBackCardText" 'functions' are 'called' with 
     empty strings ("") as 'arguments'. The "navigate" 'valiable' is then 'called'
      with the  'text' "/decks/" plus the "deckId" 'variable'. Otherwise, 'return'
       is 'returned'. This code updates the 'local server', 'resets' the 
       "frontCardText" and "backCardText" 'variable's' 'values', and takes users 
       back to the "Deck.js" 'file' web page that displays the specified "deck's" 
       info. A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside 
       which contains a 'Link' JSX 'component' (which brings users to the "Home 
       page") with an 'img' JSX 'element' inside with the 'text' "Home" followed 
       by the text " / ", a 'Link' JSX 'element' to the  the 'link' to the 
       "Deck.js" 'file' that displays the current "deck", and the 'text' " / Edit 
       Card ", plus the "card" 'variable's' "id" 'key' 'value', an 'h1' JSX 
       'element' with the 'text' "Edit Card". A 'form' JSX 'element' with the 
       "handlesubmit" 'function' as the 'value' for its 'onSubmit' 'value'. Inside
        are two 'label' JSX 'elements'; the first one has the 'text' "Front" while
         the other has the 'text' "Back". Both 'label' JSX 'elements' hold 
         'textarea' JSX 'elements' with the "handleChange" 'function' as the 
         'value' for its 'onChange' 'function' for the 'value' of its 'onChange' 
         'attributes'. Two 'button' JSX 'elements' follow; the first has the 
         'text' "Cancel" and the "navigate" 'variable' with "/decks/" plus the 
         "deckId" 'variable' as its 'argument. The second 'button' JSX 'element'
          has the 'text' "Submit". This code holds the 'links' to the "Home page" 
          and "Deck.js" 'files' and a 'form' to 'update' the selected "card". */
    useEffect(() => {   
        if (card != {} && waitForCardToUpdate) {
            updateCard(card, abortController.signal);
            setWaitForCardToUpdate(false);
            setFrontCardText("");
            setBackCardText("");
            navigate(`/decks/${deckId}`);
        } else return;
    }, [waitForCardToUpdate])

    /* The "handleChange" 'function' that takes an 'object' 'parameter' named 
    "target" that first checks if the "target" 'parameter's' 'name' 'attribute' is 
    equal to "EditCard-front-text". If so, the "setFrontCardText" is 'called' with
     the "target" 'parameter's' 'value' as its 'argument'. Next, the "target" 
     'parameter's' 'name' 'attribute' is equal to "EditCard-back-text", the 
     "setBackCardText" 'function' is 'called' with the "target" 'parameter's' 
     'value' as its 'argument'. This code 'sets' the "frontCardText" and the 
     "backCardText" 'variables' are 'set' with the data the user inputs. */
    const handleChange = ({ target }) => {
        if (target.name === "EditCard-front-text") setFrontCardText(target.value);
        else if (target.name === "EditCard-back-text") setBackCardText(target.value);
    }

    /* The "handleSubmit" 'function' takes a 'parameter' named "event". The 
    'method' 'preventDefault' is 'called' with the "event" 'parameter'. Then, the
     "setCard" 'function' is 'called' with an 'object' as its 'argument'. The 
     'object' contains an'key' named "id" with the "card" 'variable's' "id" 'key' 
     'value' using the 'Number' 'method' as its 'value', a 'key' named "front" 
     with the "frontCardText" 'variable' as its 'value', a 'key' named "back" with
      the "backCardText" 'variable' as its 'value', and a "deckId" 'key' with the 
      "card" 'variable's' "deckId" 'key' using the 'Number' 'method' as its 
      'value'. The "setWaitForCardToUpdate" 'function' is 'called' with 'true' as 
      its 'argument'. This code prevents the web page from 'reloading' after the 
       'form' is 'submitted', the "card" 'variable' is 'updated' to holds the info
        that the user 'inputs' and the "setWaitForCardToUpdate" is 'called' 
        which triggers the 'useEffect' the 'updates' the specific "card" on the 
         'local server'. */
    const handleSubmit = event => {
        event.preventDefault();
        setCard({
            id: Number(card.id),
            front: frontCardText,
            back: backCardText,
            deckId: Number(card.deckId)
        });
        setWaitForCardToUpdate(true);   
    }

    /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
    contains a 'Link' JSX 'component' (which brings users to the "Home page") with
     an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
     " / ", a 'Link' JSX 'element' to the  the 'link' to the "Deck.js" 
    'file' that displays the current "deck", and the 'text' " / Edit Card ", plus 
    the "card" 'variable's' "id" 'key' 'value', an 'h1' JSX 'element' with the 
    'text' "Edit Card". A 'form' JSX 'element' follows with the "handlesubmit" 
    'function' as the 'value' for its 'onSubmit' 'value'. Inside are two 'label' 
    JSX 'elements' and two 'button' JSX 'elements'. The first 'label' JSX 
    'element' has the 'text' Front" while the other has the 'text' "Back". Both 
    'label' JSX 'elements' hold 'textarea' JSX 'elements' with the "handleChange" 
    'function' as the 'value' for its 'onChange' 'function' for the 'value' of its
     'onChange' 'attributes'. Two 'button' JSX 'elements' follow; the first has 
     the 'text' "Cancel" and the "navigate" 'variable' with "/decks/" plus the 
     "deckId" 'variable' as its 'argument. The second 'button' JSX 'element' has 
     the 'text' "Submit". This code holds the 'links' to the "Home page" and 
     "Deck.js" which displays the proper info fo the specifified "deck" 'file' and
      a 'form' to 'update' the selected "card". */
    return (
        <div>   
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>
                Home</Link> / <Link to={`/decks/${deckId}`}>Deck {deckName}</Link> / Edit Card {card.id}</div>
                <h1>Edit Card</h1>
            <form onSubmit={handleSubmit}>
                <label htmlfor="EditCard-front-text" className='EditCard-front-text-label' >
                    Front
                    <textarea id="EditCard-front-text" name="EditCard-front-text"
                     placeholder={card.front}
                      onChange={handleChange} required  defaultValue={card.front} ></textarea>
                </label>
                <label htmlfor="EditCard-back-text" >Back
                    <textarea id="EditCard-back-text" name="EditCard-back-text" 
                     placeholder={card.back} required 
                     onChange={handleChange} defaultValue={card.back}  />
                </label>
                <button type="button" className="EditCard-cancel-btn btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)} >Cancel</button>
                <button type="submit" className="EditCard-submit-btn btn btn-primary" >Submit</button>
            </form>
        </div>
    );
}

/* Exports the "EditCard" 'function/component'. */
export default EditCard;