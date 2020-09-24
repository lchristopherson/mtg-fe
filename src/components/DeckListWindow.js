import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

export default function DeckListWindow(props) {
  const history = useHistory()

  const  [decks, setDecks] = useState([])

  useEffect(() => {
    props.client.getDecks().then(json => {
      setDecks(json)
    })
  }, [])

  const redirect = (id) => {
    history.push('/deck', {
      deckId: id
    })
  }

  return (
    <div className="deckWindow">
      <ul>{decks.map(deck => <li>{deck.name} {deck.date}<button type="button" onClick={() => {redirect(deck.id)}}>View</button></li>)}</ul>
    </div>
  )
}
