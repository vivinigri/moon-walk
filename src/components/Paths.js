import React from "react"
import { PathSvg } from "styled/Paths.styled"
import pathImg from "assets/images/path.png"
import {getPairPath} from "state/helpers"


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
        return (
          <path
            key={p}
            d={getPairPath(p, 0)}
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
