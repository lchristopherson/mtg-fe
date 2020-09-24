import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { useInterval } from '../utils/useInterval'

import DraftSelectionWindow from './DraftSelectionWindow'
import PickedCardsWindow from './PickedCardsWindow'

import './DraftWindow.css'

function DraftWindow(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const [polling, setPolling] = useState(true)
  const draftId = location.state.draftId

  const [draftCards, setDraftCards] = useState([])
  const [pickedCards, setPickedCards] = useState([])
  const [packId, setPackId] = useState()

  const fetchDraftState = () => {
    props.client.getPack(draftId).then(json => {
      setDraftCards(json.cards)
      setPackId(json.id)
    })

    props.client.getDeck(draftId).then(json => {
      setPickedCards(json.cards)
    })
  }

  const onCardSelect = (data) => {
    setDraftCards([])

    // API call to pick card
    props.client.selectCard(packId, data.id)
      .then(json => {
        setDraftCards(json.cards)
        setPackId(json.id)
      })

    // Add card to selected cards
    setPickedCards([...pickedCards, data])
  }

  useInterval(() => {
    props.client.getPack(draftId).then(json => {
      setDraftCards(json.cards)
      setPackId(json.id)
    })

    props.client.getDrafter(draftId).then(json => {
      console.log(json)

      if (json.state == 'DONE') {
        setPolling(false)

        history.push('/deck', {
          draftId: draftId
        })
      }
    })
  }, polling ? 3000 : null)

  useEffect(() => {
    fetchDraftState(dispatch, props.client)
  }, [])

  return (
    <div className="draftWindow">
      <DraftSelectionWindow cards={draftCards} onCardSelect={onCardSelect}/>
      <PickedCardsWindow cards={pickedCards}/>
    </div>
  )
}

export default DraftWindow;
