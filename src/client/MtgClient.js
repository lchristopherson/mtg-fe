class MtgClient {
  constructor(retrieveToken, user) {
    this.host = 'http://localhost:3000'
    this.retrieveToken = retrieveToken
    this.user = user
  }

  async downloadDeck(deckId) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/decks/${deckId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'text/plain'
        }
      }
    );

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.text())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async getDeck(draftId) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${draftId}/deck`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async getCurrentDeck() {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/decks/current`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async getDecks() {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/decks`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async getDraft(id) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case 200:
      case 404: {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        console.log(response.status)

        throw Error(response.statusText);
      }
    }
  }

  async getCurrentDraft() {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/current`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case 200:
      case 404: {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async startDraft(id) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${id}/start`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Content-Type': `application/json`,
          'Accept': 'application/json'
        }
      }
    )

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async leaveDraft(id) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${id}/leave`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Content-Type': `application/json`,
          'Accept': 'application/json'
        }
      }
    )

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async getPack(draftId) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${draftId}/pack`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async selectCard(packId, cardId) {
    const token = await this.retrieveToken()

    const body = JSON.stringify({
      pack: {
        card_id: cardId
      }
    })

    const response = await fetch(`${this.host}/packs/${packId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Content-Type': `application/json`,
          'Accept': 'application/json'
        },
        body: body
      }
    )

    switch(response.status) {
      case(200): {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async getDrafter(draftId) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${draftId}/drafter`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case 200:
        return new Promise(resolve => {
          resolve(response.json())
        })

      default:
        throw Error(response.statusText);
    }
  }

  async getDrafters(id) {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts/${id}/drafters`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    switch(response.status) {
      case 200:
      case 404:
        return new Promise(resolve => {
          resolve(response.json())
        })

      default:
        throw Error(response.statusText);
    }
  }

  async joinDraft(id) {
    const token = await this.retrieveToken()

    const body = JSON.stringify({
      drafter: {
        draft_id: id,
        name: this.user.name
      }
    })

    const response = await fetch(`${this.host}/drafters`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Content-Type': `application/json`,
          'Accept': 'application/json'
        },
        body: body
      }
    )

    switch(response.status) {
      case 200:
      case 201:
      case 303: {
        return new Promise(resolve => {
          resolve(response.json())
        })
      }

      default: {
        throw Error(response.statusText);
      }
    }
  }

  async createDraft(data) {
    const token = await this.retrieveToken()

    const body = JSON.stringify({
      draft: {
        name: data.name,
        sets: ['akr', 'akr', 'akr']
      }
    })

    const response = await fetch(`${this.host}/drafts`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Content-Type': `application/json`,
          'Accept': 'application/json'
        },
        body: body
      }
    );

    if (response.status >= 200 && response.status <= 299) {
      return new Promise(resolve => {
        resolve(response.json())
      })
    } else {
      throw Error(response.statusText);
    }
  }

  async getDrafts() {
    const token = await this.retrieveToken()

    const response = await fetch(`${this.host}/drafts`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    if (response.status >= 200 && response.status <= 299) {
      return new Promise(resolve => {
        resolve(response.json())
      })
    } else {
      throw Error(response.statusText);
    }
  }
}

export default MtgClient
