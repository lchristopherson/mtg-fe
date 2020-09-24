import React from 'react';

import { useHistory } from 'react-router-dom';

import CreateDraftForm from '../components/CreateDraftForm'

function CreateDraft(props) {
  const history = useHistory()

  const onCreateDraft = (data) => {
    // API call to create draft
    props.client.createDraft(data)
      .then(draft => {
        props.client.joinDraft(draft.id).then(_ => {
          // Push queue page if draft created successfully
          history.push('/draft-queue', {
            draftId: draft.id
          })
        })
      })
  }

  return <CreateDraftForm onCreateDraft={onCreateDraft}/>;
}

export default CreateDraft;
