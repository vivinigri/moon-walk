import styled, { keyframes } from "styled-components"

export const HexTile = styled.div`
  width: 120px;
  height: 140px;
  margin: 0;
  pointer-events: none;
  transform: rotate(${(props) => props.rotate}deg) scale(1);
  transition: all 0.2s ease-in-out;
`

export const HexImg = styled.img`
  z-index: 1;
  pointer-events: none;
`

export const GridRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
  width: ${(props) => props.cols * 120}px;
`

const scale = keyframes`
  0% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  50% {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
`

export const Tile = styled.div`
  width: 120px;
  height: 140px;
  cursor: pointer;
  position: absolute;
  margin: 0;
  z-index: 1;
  left: ${(props) => props.x * 120 - (props.y % 2 === 1 ? 60 : 0)}px;
  top: ${(props) => props.y * 140 - props.y * 35}px;

  &:active {
    animation: ${scale} 0.3s ease-in-out;
    z-index: 10;
    transform-origin: center;
  }
`
