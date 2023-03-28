import React, { useState } from 'react';


export default function CardForm({onSubmit, onCancel, deckName, initialState}) {

const [card, setCard] = useState(initialState);

function changeHandler({ target: {name, value} }){
    setCard((prevState) => ({...prevState, [name]: value, }))
};

function onSubmitHandler(event) {
    event.preventDefault();
    onSubmit({...card});
    setCard({front: "", back: ""});
}

return (
        <div>
            <form onSubmit={onSubmitHandler} className="card-front">
            <div>
                <legend>{deckName}</legend>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea
                        className="form-control"
                        id="front"
                        type="text"
                        name="front"
                        placeholder="Front side of Card"
                        value={card.front}
                        onChange={changeHandler}
                    />
                </div>
                    <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        type="text"
                        name="back"
                        placeholder="Back side of Card"
                        value={card.back}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className="mt-2">
                <button className="btn btn-secondary text-white" type="button" onClick={() => onCancel()}>Cancel</button>
                <button type="submit" className="btn btn-primary mx-1">Save</button>
            </div>
        </form>
    </div>
)
}
