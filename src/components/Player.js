import React, { useContext, useRef, useEffect } from "react"
import { GameMachine } from "state/gameMachine"
import styled from "styled-components"
import spaceship from "assets/images/spaceship.png"
import { gsap, MotionPathPlugin } from "gsap/all"
gsap.registerPlugin(MotionPathPlugin)

const PlayerImg = styled.img`
  position: absolute;
  z-index: 100;
  left: -20px;
  top: -30px;
`

export default function Player() {
  let playerRef = useRef(null)
  const { current } = useContext(GameMachine)
  const { player } = current.context

  useEffect(() => {
    gsap.to(playerRef, {
      duration: 3,
      ease: "power1.easeInOut",
      motionPath: {
        path: player.path,
        autoRotate: false,
      },
    })
  }, [player.path])

  return (
    <PlayerImg
      src={spaceship}
      alt="spaceship"
      ref={(el) => {
        playerRef = el
      }}
    />
  )
}
