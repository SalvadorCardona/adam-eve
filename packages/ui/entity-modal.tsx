import React, { useEffect, useState } from "react"
import { Progress } from "@/app/components/ui/progress"
import { Box, Leaf, Package, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { getResource } from "@/packages/resource/ResourceInterface"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { containerPubSub } from "@/packages/jsonLd/jsonLd"
import { Inventory } from "@/packages/ui/Inventory"

interface EntityModalProps {}

export const EntityModal: React.FC<EntityModalProps> = () => {
  const [entity, setEntity] = useState<EntityInterface | undefined>()
  const game = useGameContext().game
  useGamePubSub("userControl", (e) => {
    if (game.userControl.entitiesSelected.length) {
      setEntity(
        entityQueryFindOne(game, { "@id": game.userControl.entitiesSelected[0] }),
      )

      return
    }

    setEntity(undefined)
  })

  useEffect(() => {
    if (!entity) return
    const sub = containerPubSub.subscribe(entity["@id"], () => {
      setEntity(entityQueryFindOne(game, { "@id": entity["@id"] }))
    })
    return sub.unsubscribe
  }, [entity?.["@id"]])

  if (!entity) return null

  const metaData = getResource<EntityResourceInterface>(entity)
  const inventoryItems = entity.inventory
    ? Object.values(entity.inventory.member)
    : []

  return (
    <Card className="sm:max-w-[425px] bg-amber-50 text-amber-900">
      <CardContent>
        <CardHeader className={"flex flex-row items-center gap-4"}>
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-amber-200">
            {metaData.asset?.icon && (
              <img src={metaData.asset?.icon} alt="Icône de l'entité" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-amber-800">
            {metaData.label ?? metaData["@type"]}
          </CardTitle>
        </CardHeader>

        <div className="grid gap-4 py-4">
          {metaData.propriety?.health && (
            <>
              <div className="flex items-center gap-4">
                <Leaf className="h-5 w-5 text-green-600" />
                <div className="font-semibold">
                  Vie : {entity.life} / {metaData.propriety.health.maxLife}
                </div>
              </div>
              <Progress
                value={(entity.life / metaData.propriety.health.maxLife) * 100}
                className="h-2 bg-amber-200"
              />
            </>
          )}

          {metaData.propriety?.speed && (
            <div className="flex items-center gap-4">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div className="font-semibold">
                Vitesse : {metaData.propriety.speed}
              </div>
            </div>
          )}

          {entity.createdBy && (
            <div className="flex items-center gap-4">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div className="font-semibold">Joueur : {entity.createdBy}</div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Box className="h-5 w-5 text-purple-600" />
            <div className="font-semibold">Etat : {entity.state}</div>
          </div>

          {metaData.propriety?.work?.numberOfWorker && (
            <div className="flex items-center gap-4">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div className="font-semibold">
                Travailleurs : {entity.workers?.length ?? 0} /{" "}
                {metaData.propriety.work.numberOfWorker}
              </div>
            </div>
          )}

          {entity.inventory && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Package className="h-5 w-5 text-orange-600" />
                <div className="font-semibold">
                  Inventaire ({inventoryItems.length} /{" "}
                  {entity.inventory.size === Infinity ? "∞" : entity.inventory.size})
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {inventoryItems.map((item) => (
                  <Inventory key={item["@id"]} inventoryItem={item} />
                ))}
                {inventoryItems.length === 0 && (
                  <div className="text-sm text-amber-700 italic">Vide</div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
