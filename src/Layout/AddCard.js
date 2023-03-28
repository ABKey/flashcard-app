import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";


function AddCard(){
const [deck, setDeck] = useState({});
const [card, setCard] = useState({front:"", back:"", deckId:""});
const history = useHistory();
const {deckId} = useParams();

    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();
    }, [deckId]);

    const handleFrontChange = (event) => {
        event.preventDefault();
        setCard({...card, front: event.target.value})
    };

    const handleBackChange = (event) => {
        event.preventDefault();
        setCard({...card, back: event.target.value});
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await createCard(deckId, card);
        await readDeck(response.deckId);
        history.push(`/decks/${deck.id}`);
    }

    const cancelHandler = () => {
        history.push(`/decks/${deck.id}`);
    }

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
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h2>{deck.name}: Add Card</h2>
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
    )
}

export default AddCard;