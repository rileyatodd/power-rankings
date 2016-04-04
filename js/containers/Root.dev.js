import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import PlayerLadder from './PlayerLadder'
import AddPlayer from './AddPlayer'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <PlayerLadder/>
          <AddPlayer />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}