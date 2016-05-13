import React, { PropTypes } from 'react'
import { map, curry } from 'ramda'

const renderPlayer = curry((handleClick, onChange, player) => (
  <li key={player.id} style={{padding: '5px 0'}} onClick={() => handleClick(player.id)}>
    {player.name}
    <input value={player.score} onChange={(e) => onChange(player.id, e.target.value)} style={{float: 'right', width: '30px', display: player.selected ? 'block' : 'none'}} type="number" />
  </li>
))

let Ladder = ({ items, onPlayerClick, onScoreChange, onSubmit }) => (
  <div>
    <ol style={{width: '200px'}} >
      {map(renderPlayer(onPlayerClick, onScoreChange), items)}
    </ol>
    <button onClick={onSubmit}>Submit Match</button>
  </div>
)

Ladder.propTypes = {
  items: PropTypes.array.isRequired,
  onPlayerClick: PropTypes.func,
  onScoreChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default Ladder