import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Building,
  CookingPot,
  Hammer,
  Lock,
  TreesIcon as Tree,
  Unlock,
} from "lucide-react"
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

const CosyGameSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const handleMouseEnter = () => {
    if (!isLocked) {
      setIsOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsOpen(false)
    }
  }

  const toggleLock = () => {
    setIsLocked(!isLocked)
    setIsOpen(true)
  }

  return (
    <Sidebar
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "w-80" : "w-16"
      } h-screen fixed left-0 top-0 bg-amber-50 shadow-lg rounded-r-lg overflow-hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarContent className="p-0 h-full">
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLock}
            className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            {isLocked ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Unlock className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Tabs defaultValue="recipes" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-amber-100 rounded-none">
            <TabsTrigger
              value="recipes"
              className="data-[state=active]:bg-amber-200"
            >
              <CookingPot className="h-4 w-4" />
              <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                Recettes
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="constructions"
              className="data-[state=active]:bg-amber-200"
            >
              <Hammer className="h-4 w-4" />
              <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                Constructions
              </span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-amber-200">
              <BarChart className="h-4 w-4" />
              <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="flex-grow">
            <ScrollArea className="h-full p-4">
              <h3
                className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}
              >
                Recettes du jeu
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="plats-principaux">
                  <AccordionTrigger>
                    <CookingPot className="h-4 w-4" />
                    <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                      Plats principaux
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <ul className="list-disc list-inside">
                      <li>Ragoût de lapin</li>
                      <li>Tarte aux champignons</li>
                      <li>Soupe de légumes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="desserts">
                  <AccordionTrigger>
                    <CookingPot className="h-4 w-4" />
                    <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                      Desserts
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <ul className="list-disc list-inside">
                      <li>Tarte aux pommes</li>
                      <li>Pudding aux baies</li>
                      <li>Biscuits au miel</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="constructions" className="flex-grow">
            <ScrollArea className="h-full p-4">
              <h3
                className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}
              >
                Constructions du jeu
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ressources">
                  <AccordionTrigger>
                    <Tree className="h-4 w-4" />
                    <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                      Ressources
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <ul className="list-disc list-inside">
                      <li>Moulin à bois</li>
                      <li>Mine de pierre</li>
                      <li>Ferme</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="publiques">
                  <AccordionTrigger>
                    <Building className="h-4 w-4" />
                    <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                      Publiques
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <ul className="list-disc list-inside">
                      <li>Marché</li>
                      <li>Bibliothèque</li>
                      <li>Fontaine</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="stats" className="flex-grow">
            <ScrollArea className="h-full p-4">
              <h3
                className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}
              >
                Statistiques du jeu
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ressources">
                  <AccordionTrigger>
                    <BarChart className="h-4 w-4" />
                    <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                      Ressources
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <ul className="list-none">
                      <li>Bois: 100</li>
                      <li>Pierre: 50</li>
                      <li>Nourriture: 200</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="population">
                  <AccordionTrigger>
                    <BarChart className="h-4 w-4" />
                    <span className={`ml-2 ${isOpen ? "inline" : "hidden"}`}>
                      Population
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={isOpen ? "block" : "hidden"}>
                    <ul className="list-none">
                      <li>Villageois: 20</li>
                      <li>Travailleurs: 15</li>
                      <li>Bonheur: 85%</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SidebarContent>
    </Sidebar>
  )
}

export default CosyGameSidebar
