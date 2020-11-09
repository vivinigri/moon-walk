import React, { useContext } from "react"
import { GameMachine } from "state/gameMachine"
import styled, { keyframes } from "styled-components"
import spaceship from "assets/images/spaceship.png"

const move = keyframes`
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
`

const PlayerImg = styled.img`
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  offset-path: path(${(props) => `"${props.path}"`});
  animation: ${move} 3s infinite;
`

export default function Player() {
  const { current } = useContext(GameMachine)
  const { player } = current.context
  return <PlayerImg src={spaceship} alt="spaceship" path={player.path} />
}
