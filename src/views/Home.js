import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Home(props) {
  const history = useHistory()

  const [modal, setModal] = useState(false)
  const [destination, setDestination] = useState('/')
  const [draftId, setDraftId] = useState()

  // Check if draft is in progress
  useEffect(() => {
    props.client.getCurrentDraft().then(json => {
      if (!json.error) {
        setDraftId(json.id)

        console.log(json)

        if (json.state == 'QUEUE') {
          setDestination('/draft-queue')
        } else if (json.state == 'DRAFT') {
          setDestination('/draft')
        } else {
          return
        }

        setModal(true)
      }
    })
  }, [])

  const rejoin = () => {
    console.log(destination)

    history.push(destination, {
      draftId: draftId
    })
  }

  const toggle = () => {
    setModal(!modal)
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Draft in progress</ModalHeader>
        <ModalBody>
          You have a draft in progress, would you like to rejoin?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={rejoin}>Rejoin</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Home;
