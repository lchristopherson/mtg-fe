import React from 'react';

import Draggable from './Draggable'

import image from '../Karn.jpg'

import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <Draggable onStart={this.props.onStart} onEnd={this.props.onEnd} z={0}>
            <img src={image} alt="image" onDragStart={this.preventDragHandler}/>
        </Draggable>
      </div>
    );
  }
}

export default Card;
