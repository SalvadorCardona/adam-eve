import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import React from "react"

export function OptionsWindow() {
  return (
    <div className="p-4 bg-amber-100 rounded-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-amber-800">Options</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input id="username" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="volume">Volume</Label>
          <Slider id="volume" defaultValue={[50]} max={100} step={1} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulté</Label>
          <select
            id="difficulty"
            className="w-full p-2 rounded-md bg-white border border-amber-300"
          >
            <option>Facile</option>
            <option>Normal</option>
            <option>Difficile</option>
          </select>
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald-400 hover:bg-emerald-500 text-white"
        >
          Sauvegarder les options
        </Button>
      </form>
    </div>
  )
}
