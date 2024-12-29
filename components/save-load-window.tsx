import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useState } from "react"
import { saveGameMetadata } from "@/src/game/saveGame/SaveGameMetadataInterface"
import useGameContext from "@/src/UI/provider/useGameContext"
import { JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import { useNavigate } from "@tanstack/react-router"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SaveLoadWindowProps {
  type: "save" | "load"
}

export function SaveLoadWindow({ type }: SaveLoadWindowProps) {
  const game = useGameContext().game
  const saves = saveGameMetadata.getCollection()
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const proxy = (iriGame: JsonLdIri) => {
    if (type === "save") {
      onSave()
      return
    }

    onLoadGame(iriGame)
  }

  const onSave = () => {
    const data = new Date()
    const newname = name ?? "test-" + data.toUTCString()

    const newSaveGame = saveGameMetadata.factory({
      game,
      saveGame: { name: newname },
    })
    console.log(newSaveGame)
    saveGameMetadata.persistItem(newSaveGame)
  }

  const onLoadGame = (iriGame: JsonLdIri) => {
    navigate({
      to: "/saveGame/$saveGameId",
      params: { saveGameId: iriGame },
    })
  }

  return (
    <div className="p-4 bg-amber-100 rounded-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-amber-800">
        {type === "save" ? "Sauvegarder la partie" : "Charger une partie"}
      </h2>
      <ScrollArea className="h-[300px] rounded-md border border-amber-200 p-4">
        {saves.map((save) => (
          <div key={save["@id"]} className="flex justify-between items-center mb-2">
            <span>
              {save.name} - {save.createdAt}
            </span>
            <Button
              onClick={() => proxy(save["@id"])}
              size="sm"
              className="bg-amber-400 hover:bg-amber-500 text-amber-900"
            >
              {type === "save" ? "Sauvegarder" : "Charger"}
            </Button>
          </div>
        ))}
        {type === "save" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="username"
                className="bg-white"
              />
            </div>
            <Button
              onClick={onSave}
              size="sm"
              className="bg-amber-400 hover:bg-amber-500 text-amber-900"
            >
              Sauvegarder
            </Button>
          </>
        )}
      </ScrollArea>
    </div>
  )
}
