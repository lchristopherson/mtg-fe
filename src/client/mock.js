
// { id: "", image_uris: { small: "", normal: ""},  }
const card = {
  id: "41b282de-e204-47be-99ea-2596c12bd81c",
  image_uris: { 
    small: "https://c1.scryfall.com/file/scryfall-cards/small/front/4/1/41b282de-e204-47be-99ea-2596c12bd81c.jpg?1597076283", 
    normal: "https://c1.scryfall.com/file/scryfall-cards/normal/front/4/1/41b282de-e204-47be-99ea-2596c12bd81c.jpg?1597076283"
  }
}

const draft = {
  id: "12345",
  name: "My Special Draft",
  sets: "RNA RNA RNA"
}

const draftQueue = {
  owner: true,
  full: false,
  players: ["Luke", "Johnny", "Nick", "Viraaj"]
}

export function getDraftCards() {
  return [card, card, card, card]
}

export function getPickedCards() {
  return []
}

export function listDrafts() {
  return [draft, draft, draft]
}

export function joinDraft(id) {

}

// Return the state of the current draft queue, if user is in a queue
// { owner: true, full: false, players: ["Luke", "Johnny", "Nick", "Viraaj"] }
export function getDraftQueue() {
  return draftQueue
}

export function createDraft() {

}
