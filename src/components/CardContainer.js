import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';

import StaticCard from './StaticCard';

import './CardContainer.css';

const defaultProps = {
  cards: [],
  onCardSelect: () => {},
  modalTimeout: 300
}

export default function CardContainer(props) {
  const joinedProps = {
    ...defaultProps,
    ...props
  }

  const [onCooldown, setOnCooldown] = useState(false)
  const [modalData, setModalData] = useState({
    open: false
  })

  const onCardFocus = (ref, data, style) => {
    if (onCooldown) {
      return
    }

    setModalData({
      open: true,
      ref: ref,
      cardData: data,
      style: style,
      image: data.image_uris.normal
    })
  }

  const onMouseLeave = (event) => {
    setModalData({
      open: false
    })
  }

  const onCardSelect = (data) => {
    joinedProps.onCardSelect(data)

    setModalData({
      open: false
    })

    setOnCooldown(true)
    setTimeout(() => setOnCooldown(false), 500)
  }

  const onDoubleClick = (event) => {
    onCardSelect(modalData.cardData)

    event.preventDefault()
  }

  const onDragStart = (e) => {
    e.preventDefault()
  }

  return (
    <div className="card-container">
      <Modal isOpen={modalData.open} contentClassName='card-content' fade={false} backdrop={false} autoFocus={false} size='sm' style={modalData.style} container={modalData.ref}>
        <ModalBody>
          <div className="card-div" onMouseLeave={onMouseLeave} onDoubleClick={onDoubleClick} onDragStart={onDragStart}>
            <img className='noSelect' src={modalData.image}/>
          </div>
        </ModalBody>
      </Modal>
      {joinedProps.cards.map(data => 
        <StaticCard 
          data={data} 
          onCardSelect={onCardSelect}
          onCardFocus={onCardFocus}
        />
      )}
    </div>
  )
}
