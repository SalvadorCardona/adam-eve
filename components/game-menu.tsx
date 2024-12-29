import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, Twitter, ExternalLink, Instagram, Save, Upload, Settings } from 'lucide-react'
import { SaveLoadWindow } from './save-load-window'
import { OptionsWindow } from './options-window'

export function GameMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [rightWindow, setRightWindow] = useState<'save' | 'load' | 'options' | null>(null)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-200 text-amber-800 hover:bg-amber-300">Menu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-amber-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-800">Menu du Jeu</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="grid gap-4 py-4">
              <Button 
                className="w-full bg-rose-400 hover:bg-rose-500 text-white"
                onClick={() => setRightWindow('save')}
              >
                <Save className="mr-2 h-4 w-4" /> Sauvegarder la partie
              </Button>
              <Button 
                className="w-full bg-sky-400 hover:bg-sky-500 text-white"
                onClick={() => setRightWindow('load')}
              >
                <Upload className="mr-2 h-4 w-4" /> Charger une partie
              </Button>
              <Button 
                className="w-full bg-emerald-400 hover:bg-emerald-500 text-white"
                onClick={() => setRightWindow('options')}
              >
                <Settings className="mr-2 h-4 w-4" /> Options
              </Button>
            </div>
            <footer className="flex justify-center space-x-4 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://bsky.app" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                <ExternalLink className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                <Instagram className="h-6 w-6" />
              </a>
            </footer>
          </div>
          <div className="w-1/2">
            {rightWindow === 'save' && <SaveLoadWindow type="save" />}
            {rightWindow === 'load' && <SaveLoadWindow type="load" />}
            {rightWindow === 'options' && <OptionsWindow />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

