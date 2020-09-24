import React, { useRef, useState } from 'react';

import './Card.css';

export default function StaticCard(props) {
  const [timer, setTimer] = useState()

  const cardRef = useRef()

  const displayModal = (rect) => {
    props.onCardFocus(
      cardRef, // ref
      props.data, // data
      { top: rect.top - rect.height / 2 + 20, left: rect.left - rect.width / 2 } // style
    )
  }

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect()

    const timer = setTimeout(() => { 
      displayModal(rect)
    }, 300);

    setTimer(timer)
  }

  const onMouseEnterCard = (event) => {
    handleMouseEnter(event)
  }

  const onMouseOver = (event) => {
    handleMouseEnter(event)
  }

  const onMouseLeaveCard = (e) => {
    clearTimeout(timer)
  }

  const onDoubleClick = (e) => {
    props.onCardSelect(props.data)

    e.preventDefault()
  }

  const onDragStart = (e) => {
    e.preventDefault()
  }

  return (
    <div className="card" ref={cardRef} onDoubleClick={onDoubleClick} onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard} onMouseOver={onMouseOver} onDragStart={onDragStart}>
      <img className='noSelect' src={props.data.image_uris.small}/>
    </div>
  );
}
