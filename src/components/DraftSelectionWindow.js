import React from 'react';
import { useSelector } from 'react-redux'

import CardContainer from './CardContainer';

import {
  selectDraftCards
} from '../features/draft/draftCardsSlice'

import './DraftSelectionWindow.css';

export default function DraftSelectionWindow(props) {
  // const cards = useSelector(selectDraftCards)

  return (
    <div className="draftSelectionWindow">
      <CardContainer cards={props.cards} onCardSelect={props.onCardSelect}/>
    </div>
  )
}
