import React, {useEffect, useState} from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { useInterval } from '../utils/useInterval'

import Loading from "../components/Loading";

function DraftQueue(props) {
  const [loading, setLoading] = useState(true)
  const [polling, setPolling] = useState(true);
  const [drafters, setDrafters] = useState([])
  const history = useHistory()
  const location = useLocation()

  const draftId = location.state.draftId
  if (!draftId) {
    history.push('/')
  }

  const loadDrafters = () => {
    props.client.getDrafters(draftId)
      .then(json => {
        if (json.error) {
          console.log(json.error)

          history.push('/')
        } else {
          setLoading(false)
          setDrafters(json)
        }
      })
  }

  useEffect(() => {
    loadDrafters()
  }, [])

  useInterval(() => {
      // Update drafters in queue
      loadDrafters()

      // Check if draft has started
      props.client.getDraft(draftId)
        .then(json => {
          if (json.state == 'DRAFT') {
            setPolling(false)

            history.push('/draft', {
              draftId: draftId
            })
          }
        })
  }, polling ? 2000 : null)

  const leaveDraft = () => {
    props.client.leaveDraft(draftId).then(json => {
      history.push('/')
    })
  }

  const players = drafters.map(player => <li>{player.name}</li>)

  return (
    loading ? 
    <Loading /> :
    <div>
      <ul>{players}</ul>
      <button type="button" onClick={() => props.client.startDraft(draftId)}>Start</button>
      <button type="button" onClick={leaveDraft}>Leave</button>
    </div>
    )
}

export default DraftQueue;
