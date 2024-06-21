/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useEffect, useState } from 'react';
/* Imports the 'useParams' and the 'useNavigate' 'components' from 
'react-router-dom'. */
import { useParams, useNavigate } from 'react-router-dom';
/* Imports the "readDeck" and the "createCard" 'functions/components'
 from '../utils/api/index.js'. */
/* Imports the "readDeck", "updateCard", and the "readCard" 'functions/components'
 from '../utils/api/index.js'. */
 import { readCard, updateCard, createCard, readDeck } from '../utils/api/index';

 function AddEditCards({ cardI }) {
    //cardId = Number(cardId);
    const {deckId, cardId} = useParams();
    /* The "card" 'variable' and the "setCard" 'function' are 'declared' using the 
    'useState' (which is set to an empty 'string' ("")). */
    const [card, setCard] = useState([]);
    /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
    const [frontCardText, setFrontCardText] = useState("");
    /* The "backCardText" 'variable' and the "setBackCardText" 'function' are 
    'declared' using the 'useState' (which is set to an empty 'string' ("")). */
    const [backCardText, setBackCardText] = useState("");
    const navigate = useNavigate();
    const [waitToAddCard, setWaitToAddCard] = useState(false);
    const abortController = new AbortController();
    const [updateEditCardText, setUpdateEditCardText] = useState(false);
      /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
  using the 'useState' 'component' with an empty 'string' ("") as its argument. */
  const [deckName, setDeckName] = useState("");
      /* The "waitForCardToUpdate" 'variable' and the "setWaitForCardToUpdate" 
  'function' are 'declared' using the 'useState' (which is set to 'false'). */
     /* The "abortcontroller" holds a 'new AbortController' 'method'. */
 // console.log(deckId)
 // console.log(cardId)
  const [waitForCardToUpdate, setWaitForCardToUpdate] = useState(false); 
  useEffect(() => { 
    if (cardId) {  
    async function displayEditCardText() {
       try { 
             setUpdateEditCardText(true)
            } catch (error) { 
               console.error(error); 
           } 
       } displayEditCardText();
       return () => abortController.abort();
    } else return;
   }, [deckId]);

   useEffect(() => { 
    if (cardId) {   
        async function getCard() { 
           try { 
              const currentCard = await readCard(cardId, abortController.signal);
               setCard(currentCard); 
               setFrontCardText(currentCard.front);
               setBackCardText(currentCard.back);
              } catch (error) { 
                  console.error(error); 
              } 
          } getCard(); 
          return () => abortController.abort();
        } else return;
      }, [updateEditCardText]);


 /* useEffect(() => { 
             async function getDeck() {
                try { 
                    const currentDeck = await readDeck(deckId, abortController.signal);
                    setDeck(currentDeck);
                      setDeckName(currentDeck.name);
                     } catch (error) { 
                        console.error(error); 
                    } 
                } getDeck(); 
                return () => abortController.abort();
            }, [deckId]);

            useEffect(() => { 
                if (cardId) {
                async function getCard() { 
                    try { 
                       const currentCard = await readCard(cardId, abortController.signal);
                        setCard(currentCard); 
                        setFrontCardText(currentCard.front);
                        setBackCardText(currentCard.back); 
                       } catch (error) { 
                           console.error(error); 
                       } 
                   } getCard(); 
                   return () => abortController.abort();
                } else return;
               }, [deckName]);

*/
       useEffect(() => {  
        if (waitToAddCard && !cardId) { 
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
           }, [waitToAddCard]);

       useEffect(() => { 
        if (waitForCardToUpdate && cardId) { 
            
           async function updateCardData() { 
               try { 
                   await updateCard(card, abortController.signal);
                    setWaitForCardToUpdate(false);
                     setFrontCardText("");
                      setBackCardText("");
                       navigate(`/decks/${deckId}`);
                    } catch (error) { 
                       console.error(error); 
                   }
                } updateCardData(); 
               } return () => abortController.abort();
           }, [waitForCardToUpdate, navigate, card, deckId]);


       const handleChange = ({ target }) => {
        if(cardId) {
            if (target.name === "EditCard-front-text") setFrontCardText(target.value);
            else if (target.name === "EditCard-back-text") setBackCardText(target.value);
    } else {
        if (target.name === "AddCard-front-text") setFrontCardText(target.value);
        else if (target.name === "AddCard-back-text") setBackCardText(target.value);
    }
    }

       const handleSubmit = event => { 
        event.preventDefault();
        console.log(card)
         if (cardId) {
            setCard({ id: Number(card.id), front: frontCardText, back: backCardText, 
            deckId: Number(card.deckId), 
        }); 
        setWaitForCardToUpdate(true);
     } else setWaitToAddCard(true); 
    };
    
       return (
                <form onSubmit={handleSubmit}>
                <label htmlFor={cardId ? "EditCard-front-text" : 'AddCard-front-text'} className={cardId ? 'EditCard-front-text-label' : ""} >
                    Front
                    <textarea id={cardId ? "EditCard-front-text" : "AddCard-front-text"} 
                    name={cardId ? "EditCard-front-text" : "AddCard-front-text" }
                     placeholder={cardId ? card.front : 'Front side of card'}
                      onChange={handleChange} value={frontCardText} required ></textarea>
                </label>
                <label htmlFor={cardId ? "EditCard-back-text" : 'AddCard-back-text'} >Back
                    <textarea id={cardId ? "EditCard-back-text" : "AddCard-back-text"} name={cardId ? "EditCard-back-text" : "AddCard-back-text"}
                     placeholder={cardId ? card.front : 'Back side of card'} 
                     onChange={handleChange} value={backCardText} required />
                </label>
                <button type="button" className={cardId ? "EditCard-cancel-btn btn btn-secondary" : 'AddCard-done-btn btn btn-secondary' } onClick={() => navigate(`/decks/${deckId}`)} >Cancel</button>
                <button type="submit" className={cardId ? "EditCard-submit-btn btn btn-primary" : 'AddCard-submit-btn btn btn-primary'} >Submit</button>
            </form>

        )
  
 }

 export default AddEditCards;