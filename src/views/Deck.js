import React from 'react';

import DeckWindow from '../components/DeckWindow'

function Deck(props) {
  return (
    <div>
      <DeckWindow client={props.client}/>
    </div>
  )
}

export default Deck;
