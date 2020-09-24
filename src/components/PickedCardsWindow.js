import React from 'react'

import CardContainer from './CardContainer';

import './PickedCardsWindow.css'

export default function PickedCardsWindow(props) {
  return (
    <div className="pickedCardsWindow">
      <CardContainer cards={props.cards} />
    </div>
  )
}
