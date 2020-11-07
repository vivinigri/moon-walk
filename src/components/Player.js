import React, {useContext} from "react"
import { GameMachine } from "state/gameMachine"
import styled, {keyframes} from "styled-components"
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
  offset-path: path(${(props) => `"${props.path}"`});
  animation: ${move} 3s ease-in-out;
`

export default function Player() {
  const { current } = useContext(GameMachine)
  const {player} = current.context
  console.log('path', player.path);
  return <PlayerImg src={spaceship} alt="spaceship" path={player.path} />
}
