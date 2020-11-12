import React, { useContext, useRef, useEffect } from "react"
import { GameMachine } from "state/gameMachine"
import spaceship from "assets/images/tank.png"
import { gsap, MotionPathPlugin } from "gsap/all"
import { PlayerImg } from "styled/Player.styled"
gsap.registerPlugin(MotionPathPlugin)

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
        autoRotate: true,
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
