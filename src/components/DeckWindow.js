import React, { useEffect, useState } from 'react';

import {useLocation} from 'react-router-dom'

import CardContainer from './CardContainer';
import DeckMenu from './DeckMenu';

import './DeckWindow.css';

export default function DeckWindow(props) {
  const location = useLocation()

  const [cards, setCards] = useState([])
  const [deckId, setDeckId] = useState()

  useEffect(() => {
    if (location.state.draftId != undefined) {
      console.log("Retrieving deck by ID")
      props.client.getDeck(location.state.draftId).then(json => {
        setCards(json.cards)
        setDeckId(json.id)
      })
    } else {
      console.log("Retrieving current deck")
      props.client.getCurrentDeck().then(json => {
        setCards(json.cards)
        setDeckId(json.id)
      })
    }
  }, [])

  return (
    <div className="deckWindow">
      <DeckMenu client={props.client} deckId={deckId}/>
      <CardContainer cards={cards} />
    </div>
  )
}
