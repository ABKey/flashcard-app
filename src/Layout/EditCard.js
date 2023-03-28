import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";


function EditCard() {
    const history = useHistory();
    const [card, setCard] = useState({front: "", back: "", deckId: "" });
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const {cardId} = useParams();
    
    /*
    const handleFrontChange = (event) => {
        setCard(card, {front: event.target.value})
    }

    const handleBackChange = (event) => {
        setCard(card, {back: event.target.value});
    }
    */

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
    
    const submitHandler = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
    };

    function cancelHandler(event) {
        event.preventDefault();
        history.push(`/decks/${deck.id}`);
    };
    
    const editForm = card.id ? (
        <CardForm
            onDone={cancelHandler}
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
                <li className="breadcrumb-item">Edit Card {card.id}</li>
            </ol>
        </nav>
        
        <h2>Edit Card</h2>
        {editForm}
    </div>
        );
    }

export default EditCard;