import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { updateScore } from 'actions'
import styles from './Player.css'

const Player = ({ id, score, name, rank, formId, updateScore, record: { wins, losses } }) => (
  <li className={styles.player}>
    <span className={styles.rank}>{rank}</span> {name} <span className={styles.record}>({wins}-{losses})</span>
    <input value={score} type="number" form={formId}
           onChange={(e) => updateScore(id, parseInt(e.target.value))}
           className={styles.input} />
  </li>
)

Player.propTypes = {
  id: PropTypes.number.isRequired,
  formId: PropTypes.string,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  score: PropTypes.number,
  updateScore: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  updateScore: compose(dispatch, updateScore)
})

export default connect(null, mapDispatchToProps)(Player)
