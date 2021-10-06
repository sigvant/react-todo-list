import React, { Component } from 'react'
import './App.css'
import UnorderedList from './components/UnorderedList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: '',
      list: []
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localstorago
    // when use leaves/refreshes the page
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key`s value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value })
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput = (key, value) => {
    // update react state
    this.setState({
      [key]: value
    })
  }

  addItem = () => {
    //craete item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    //copy of current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem)

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItem: ''
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({list: updatedList})
  }

  deleteItem = (id) => {
    // copy current list of items
    const currentList = [...this.state.list]

    // filter out item being deleted
    const updatedList = currentList.filter(item => item.id !== id)

    // updates list with updatedList (without the deleted item)
    this.setState({list: updatedList})
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          Add an item...
          <br />
          
          <input type="text" placeholder='Type item here...'
          value={this.state.newItem}
          onChange={e => this.updateInput('newItem', e.target.value)}
          />

          <button
           onClick={() => this.addItem()}
           disabled={!this.state.newItem.length}> 
           Add 
          </button>

          <br />

          <UnorderedList list={this.state.list} deleteItem={this.deleteItem}/>

        </div>
      </div>
    )
  }
}

export default App
