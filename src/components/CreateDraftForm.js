import React from 'react';

import './CreateDraftForm.css'

class CreateDraftForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ 
      data: { 
        [event.target.name]: event.target.value
      } 
    });

    console.log(this.state)
  }

  handleSubmit(event) {
    this.props.onCreateDraft(this.state.data)

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name:</label>
        </div>
        <div>
          <input name="name" type="text" value={this.state.data.name} onChange={this.handleChange} />
        </div>
        {/* <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label> */}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateDraftForm;
