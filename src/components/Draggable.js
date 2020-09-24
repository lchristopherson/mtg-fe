import React from 'react';

class Draggable extends React.Component {
  constructor(props) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)

    this.myRef = React.createRef();
    
    this.state = {
      z: props.z,
      dragging: false,
      // pos: props.pos,
      rel: null,
      style: null
    }
  }

  onMouseDown(e) {
    var rect = this.myRef.current.getBoundingClientRect()

    this.setState({
      z: 1,
      dragging: true,
      rel: {
        x: e.pageX - rect.left,
        y: e.pageY - rect.top
      }
    })
    e.stopPropagation()
    e.preventDefault()

    this.props.onStart(this)
  }

  onMouseUp(e) {
    this.setState({
      z: this.props.z,
      dragging: false
    })

    this.props.onEnd(this)
  }

  // getDefaultProps() {
  //   return {
  //     // allow the initial position to be passed in as a prop
  //     initialPos: {x: 0, y: 0}
  //   }
  // }

  // getInitialState() {
  //   return {
  //     pos: this.props.initialPos,
  //     dragging: false,
  //     rel: null // position relative to the cursor
  //   }
  // }

  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  // componentDidUpdate(props, state) {
  //   if (this.state.dragging && !state.dragging) {
  //     document.addEventListener('mousemove', this.onMouseMove)
  //     document.addEventListener('mouseup', this.onMouseUp)
  //   } else if (!this.state.dragging && state.dragging) {
  //     document.removeEventListener('mousemove', this.onMouseMove)
  //     document.removeEventListener('mouseup', this.onMouseUp)
  //   }
  // }

  // calculate relative position to the mouse and set dragging=true
  // onMouseDown(e) {
  //   // only left mouse button
  //   if (e.button !== 0) return
  //   var pos = $(this.getDOMNode()).offset()
  //   this.setState({
  //     dragging: true,
  //     rel: {
  //       x: e.pageX - pos.left,
  //       y: e.pageY - pos.top
  //     }
  //   })
  //   e.stopPropagation()
  //   e.preventDefault()
  // }

  // onMouseUp(e) {
  //   this.setState({dragging: false})
  //   e.stopPropagation()
  //   e.preventDefault()
  // }

  onMouseMove(e) {
    if (!this.state.dragging) return
    this.setState({
      // pos: {
      //   x: e.pageX - this.state.rel.x,
      //   y: e.pageY - this.state.rel.y
      // },
      style: {
        left: (e.pageX - this.state.rel.x) + 'px',
        top: (e.pageY - this.state.rel.y) + 'px',
        position: 'absolute',
        zIndex: this.state.z
      }
    })
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.
    // return this.transferPropsTo(React.DOM.div({
    //   onMouseDown: this.onMouseDown,
    //   style: {
    //     left: this.state.pos.x + 'px',
    //     top: this.state.pos.y + 'px'
    //   }
    // }, this.props.children))
    
    return (
      <div ref={this.myRef} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove} style={this.state.style}>
        {this.props.children}
      </div>
    )
  }
}

export default Draggable;
