import { createSlice } from '@reduxjs/toolkit'

export const draftCardsSlice = createSlice({
  name: 'draftCards',
  initialState: {
    cards: []
  },
  reducers: {
    set: (state, cards) => {
      state.cards = cards.payload
    }
  }
})

export const fetchDraftCards = (client, draftId) => {
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const pack = await client.getPack(draftId)

      // dispatch an action when we get the response back
      dispatch(set(pack.cards))
    } catch (err) {
      // If something went wrong, handle it here
      console.log(err)
    }
  }
}

export const selectDraftCards = state => state.draftCards.cards

export const { set } = draftCardsSlice.actions

export default draftCardsSlice.reducer
