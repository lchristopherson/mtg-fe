import React from 'react';

import DraftListItem from './DraftListItem'

function DraftList(props) {
  const drafts = props.drafts
  const listItems = drafts.map(data => <DraftListItem data={data} joinDraft={props.joinDraft}/>)

  return <ul>{listItems}</ul>;
}

export default DraftList;
