import React, { useEffect, useState } from 'react';

import DraftList from '../components/DraftList'
import Loading from "../components/Loading";

import { useHistory } from 'react-router-dom';

function JoinDraft(props) {
  const [loading, setLoading] = useState(true)
  const [drafts, setDrafts] = useState([])

  const history = useHistory()

  const loadDrafts = () => {
    console.log('Loading drafts')
    props.client.getDrafts()
      .then(json => {
        setLoading(false)
        setDrafts(json)
      })
  }

  useEffect(() => {
    loadDrafts()
  }, [])

  const joinDraft = (id) => {
    console.log("Joined draft: " + id)

    // API call to join draft
    props.client.joinDraft(id).then(json => {
      history.push('/draft-queue', {
        draftId: id
      })
    })
  }

  return (loading ? <Loading /> : <DraftList drafts={drafts} joinDraft={joinDraft}/>)
}

export default JoinDraft;
