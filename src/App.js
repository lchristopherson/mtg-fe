import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from "reactstrap";
import NavBar from "./components/NavBar";
import Deck from "./views/Deck"
import Decks from "./views/Decks"
import Draft from "./views/Draft"
import DraftQueue from "./views/DraftQueue"
import Home from "./views/Home"
import Profile from "./views/Profile"
import CreateDraft from "./views/CreateDraft"
import JoinDraft from "./views/JoinDraft"
import history from "./utils/history";
import { useAuth0 } from "@auth0/auth0-react";
import MtgClient from './client/MtgClient'

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const client = new MtgClient(getAccessTokenSilently, user)

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container style={{'margin-left': 'auto', 'margin-right': 'auto', 'max-width': '1460px'}}>
          <Switch>
            <Route path="/create-draft">
              <CreateDraft client={client}/>
            </Route>
            <Route path="/deck">
              <Deck client={client}/>
            </Route>
            <Route path="/decks">
              <Decks client={client}/>
            </Route>
            <Route path="/draft">
              <Draft client={client}/>
            </Route>
            <Route path="/draft-queue">
              <DraftQueue client={client}/>
            </Route>
            <Route path="/join-draft">
              <JoinDraft client={client}/>
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home client={client}/>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
