import { gameMachine, GameMachine } from "./state/gameMachine"
import { useMachine } from "@xstate/react"
import useWindowSize from "./hooks/useWindowSize"
import Grid from "./components/Grid"
import "./App.css"

function App() {
  const [current, send] = useMachine(gameMachine)
  const size = useWindowSize()

  const boardScale = () => {
    if (!size) return 1
    return Math.min(
      (size.width * 0.9) / (64 * 17),
      (size.height * 0.8) / (64 * 13)
    )
  }

  return (
    <div className="App">
      <GameMachine.Provider value={{ current, send }}>
        <div className="GameArea">
          <div style={{ transform: `scale(${boardScale()})` }}>
            <Grid />
          </div>
        </div>
      </GameMachine.Provider>
    </div>
  )
}

export default App
