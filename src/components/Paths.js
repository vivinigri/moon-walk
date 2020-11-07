import React from "react"
import { PathSvg } from "styled/Paths.styled"
import pathImg from "assets/images/path.png"

const points = ["90,17.5", "120,70", "90,122.5", "30,122.5", "0,70", "30,17.5"]
const center = "C60,70 60,70"

const Paths = ({ paths }) => {
  return (
    <PathSvg height="140" width="120">
      <defs>
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width="120"
          height="140"
        >
          <image href={pathImg} x="0" y="0" width="120" height="140" />
        </pattern>
      </defs>
      {paths.map((p) => {
        const [p1, p2] = p.split("-")
        const path = `M${points[p1]} ${center} ${points[p2]}`
        return (
          <path
            key={path.replace(" ", "-")}
            d={path}
            strokeWidth="9"
            fill="none"
            stroke="url(#pattern)"
          />
        )
      })}
    </PathSvg>
  )
}

export default Paths
