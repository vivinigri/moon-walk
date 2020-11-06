import React from "react"
import styled from "styled-components"
import pathImg from "./../assets/images/path.png"

const PathSvg = styled.svg`
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
`
const points = ["90,17.5", "120,70", "90,122.5", "30,122.5", "0,70", "30,17.5"]
const center = "C60,70 60,70"

const Path = ({ p1, p2 }) => {
  const path = `M${points[p1]} ${center} ${points[p2]}`
  return (
    <PathSvg height="140" width="120">
      <defs>
        <pattern
          id="img1"
          patternUnits="userSpaceOnUse"
          width="120"
          height="140"
        >
          <image href={pathImg} x="0" y="0" width="120" height="140" />
        </pattern>
      </defs>
      <path d={path} strokeWidth="12" fill="none" stroke="url(#img1)" />
    </PathSvg>
  )
}

export default Path
