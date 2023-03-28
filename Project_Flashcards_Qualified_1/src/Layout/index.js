import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import NewDeck from "./NewDeck";
import Deck from "./Deck";
import StudyView from "./StudyView";
import EditDeck from "./EditDeck";
import NewCard from "./NewCard";
import EditCard from "./EditCard";


function Layout() {
  return (
    <div className="Layout">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyView /> 
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <NewCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;