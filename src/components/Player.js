import React from "react"
import styled from "styled-components"
import spaceship from "assets/images/spaceship.png"

const PlayerImg = styled.img`
  position: absolute;
  z-index: 100;
`

export default function Player() {
  return <PlayerImg src={spaceship} alt="spaceship" />
}
