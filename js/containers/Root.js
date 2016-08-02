import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import PlayerLadder from 'containers/PlayerLadder'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <PlayerLadder />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
