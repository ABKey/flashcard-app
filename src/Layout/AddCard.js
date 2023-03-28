import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./CardForm";


function AddCard({initialState}){
const [deck, setDeck] = useState({});
const [card, setCard] = useState(initialState);
const history = useHistory();
const {deckId} = useParams();

    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();
    }, [deckId]);

    const submitHandler = async (event) => {
        event.preventDefault();
        setCard({...card, front: event.target.value, back: event.target.value})
        const response = await createCard(deckId, card);
        await readDeck(response.deckId);
        history.push(`/decks/${deck.id}`);
    }

    const cancelHandler = () => {
        history.push(`/decks/${deck.id}`);
    }

    const editForm = card.id ? (
        <CardForm
            onCancel={cancelHandler}
            onSubmit={submitHandler}
            initialState={card}
            doneButton="Cancel"
        />
    ) : (
    <p>Loading...</p>
    )

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
            {editForm}
    </div>
    )
}

export default AddCard;