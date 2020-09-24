import React from 'react';

import FileSaver from 'file-saver';

export default function DeckMenu(props) {
  const download = () => {
    props.client.downloadDeck(props.deckId).then(text => {
      var blob = new Blob([text], {type: "text/plain;charset=utf-8"});

      FileSaver.saveAs(blob, 'deck.txt');
    })
  }

  return (
    <div className="deckMenu">
      <button type="button" onClick={download}>Download</button>
    </div>
  )
}
