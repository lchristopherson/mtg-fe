import { createSlice } from '@reduxjs/toolkit'

export const pickedCardsSlice = createSlice({
  name: 'pickedCards',
  initialState: {
    cards: []
  },
  reducers: {
    add: (state, card) => {
      state.cards = [...state.cards, card.payload]
    },
    set: (state, cards) => {
      state.cards = cards.payload
    }
  }
})

export const fetchPickedCards = (client, draftId) => {
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      client.getDeck(draftId).then(json => {
        dispatch(set(json.cards))
      })
    } catch (err) {
      // If something went wrong, handle it here
      console.log(err)
    }
  }
}

export const selectPickedCards = state => state.pickedCards.cards

export const { add, set } = pickedCardsSlice.actions

export default pickedCardsSlice.reducer
