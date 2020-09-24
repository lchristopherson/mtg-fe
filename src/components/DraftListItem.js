import React from 'react';

function DraftListItem(props) {
  console.log(props.data)

  return (
    <li key={props.data.id}>
      {props.data.name}
      <button type="button" onClick={() => props.joinDraft(props.data.id)}>Join</button>
    </li>
  );
}

export default DraftListItem;
