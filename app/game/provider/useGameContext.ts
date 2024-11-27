import { useContext } from "react"
import { GameContext, GameContextInterface } from "@/app/game/provider/GameContext"

export default function useGameContext() {
  return useContext(GameContext) as Required<GameContextInterface>
}
