import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CookingPot, Hammer, BarChart, TreesIcon as Tree, Building } from 'lucide-react'

const CosyGameBook = () => {
  return (
    <Card className="w-80 h-screen fixed left-0 top-0 rounded-r-lg shadow-lg bg-amber-50">
      <CardContent className="p-0 h-full">
        <Tabs defaultValue="recipes" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-amber-100 rounded-none">
            <TabsTrigger value="recipes" className="data-[state=active]:bg-amber-200">
              <CookingPot className="mr-2 h-4 w-4" />
              Recettes
            </TabsTrigger>
            <TabsTrigger value="constructions" className="data-[state=active]:bg-amber-200">
              <Hammer className="mr-2 h-4 w-4" />
              Constructions
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-amber-200">
              <BarChart className="mr-2 h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="flex-grow">
            <ScrollArea className="h-full p-4">
              <h3 className="text-lg font-semibold mb-2">Recettes du jeu</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="plats-principaux">
                  <AccordionTrigger>Plats principaux</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside">
                      <li>Ragoût de lapin</li>
                      <li>Tarte aux champignons</li>
                      <li>Soupe de légumes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="desserts">
                  <AccordionTrigger>Desserts</AccordionTrigger>
                  <AccordionContent>
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
              <h3 className="text-lg font-semibold mb-2">Constructions du jeu</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ressources">
                  <AccordionTrigger>
                    <Tree className="mr-2 h-4 w-4" />
                    Ressources
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside">
                      <li>Moulin à bois</li>
                      <li>Mine de pierre</li>
                      <li>Ferme</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="publiques">
                  <AccordionTrigger>
                    <Building className="mr-2 h-4 w-4" />
                    Publiques
                  </AccordionTrigger>
                  <AccordionContent>
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
              <h3 className="text-lg font-semibold mb-2">Statistiques du jeu</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ressources">
                  <AccordionTrigger>Ressources</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-none">
                      <li>Bois: 100</li>
                      <li>Pierre: 50</li>
                      <li>Nourriture: 200</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="population">
                  <AccordionTrigger>Population</AccordionTrigger>
                  <AccordionContent>
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
      </CardContent>
    </Card>
  )
}

export default CosyGameBook

