import { configureStore } from '@reduxjs/toolkit'

import pickedCardsReducer from '../features/draft/pickedCardsSlice'
import draftCardsReducer from '../features/draft/draftCardsSlice'

export default configureStore({
  reducer: {
    pickedCards: pickedCardsReducer,
    draftCards: draftCardsReducer
  }
})
