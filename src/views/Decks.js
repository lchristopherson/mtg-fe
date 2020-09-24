import React from 'react';

import DeckListWindow from '../components/DeckListWindow'

function Decks(props) {
  return (
    <div>
      <DeckListWindow client={props.client}/>
    </div>
  )
}

export default Decks;
