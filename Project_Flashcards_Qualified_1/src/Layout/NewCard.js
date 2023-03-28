import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";

import CardForm from "./CardForm";



function NewCard(){
const [deck, setDeck] = useState({});
const [front, setFront] = useState("");
const [back, setBack] = useState("");
const history=useHistory();
const {deckId} = useParams();


    const handleFrontChange = (event) => {
        event.preventDefault();
        setFront(event.target.value)
    };

    const cancelButtonHandler = () => {
        history.push(`/decks/${deck.id}`);
    }

    const handleBackChange = (event) => {
        event.preventDefault();
        setBack(event.target.value);
    }

    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId);
             setDeck(response);
             console.log(response);
        }
        loadDeck();
    }, [deckId]);

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await createCard( deckId, {front, back} );
        console.log(response);
        await readDeck(response.deckId);
        history.go(0);
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
        <CardForm 
        type="submit"
        submitHandler={submitHandler}
        cancelButtonHandler={cancelButtonHandler}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        deckId={deckId}
        />
    </div>
    )
}

export default NewCard;