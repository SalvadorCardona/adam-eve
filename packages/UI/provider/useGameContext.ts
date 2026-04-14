import { useContext } from "react"
import {
  GameContext,
  GameContextInterface,
} from "@/packages/UI/provider/GameContext"

export default function useGameContext() {
  return useContext(GameContext) as Required<GameContextInterface>
}
