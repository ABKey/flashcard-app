import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";


function EditCard() {
    const history = useHistory();
    const [card, setCard] = useState({id: "", front: "", back: "", deckId: "" });
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const {cardId} = useParams();
    
    const handleFrontChange = (event) => {
        setCard({...card, front: event.target.value})
    }

    const handleBackChange = (event) => {
        setCard({...card, back: event.target.value});
    }
    useEffect(() => {
    
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();
    }, [deckId]);
    
    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId);
            setCard(response);
        }
        loadCard();
    }, [cardId]);
    
    function cancelHandler(event) {
        event.preventDefault();
        history.push(`/decks/${deck.id}`);
    }
    
    const submitHandler = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
    };
    
    console.log(card.front)
    
    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                     <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Edit Card {card.id}</li>
            </ol>
        </nav>
        
        <h2>Edit Card</h2>
        <form onSubmit={submitHandler}>
            <div>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea
                        className="form-control"
                        id="front"
                        type="text"
                        name="front"
                        value={card.front}
                        onChange={handleFrontChange}
                    />
                </div>
                    <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        type="text"
                        name="back"
                        value={card.back}
                        onChange={handleBackChange}
                    />
                </div>
            </div>
            <div className="mt-2">
                <button className="btn btn-secondary text-white" type="button" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary ml-2">Save</button>
            </div>
        </form>
    </div>
        );
    }

export default EditCard;