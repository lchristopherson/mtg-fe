import React from 'react';

import DraftWindow from '../components/DraftWindow'

function Draft(props) {
  return (
    <div className="draft">
      <DraftWindow client={props.client}/>
    </div>
  )
}

export default Draft;
