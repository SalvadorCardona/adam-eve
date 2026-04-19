import React, { useState } from "react"
import { Progress } from "@/app/components/ui/progress"
import { Box, Leaf, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { getResource } from "@/packages/resource/ResourceInterface"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"

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

  if (!entity) return

  const metaData = getResource<EntityResourceInterface>(entity)
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
              <div className="font-semibold">Payer : {entity.createdBy}</div>
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

          {/*{Object.hasOwn(entity, "inventory") && (*/}
          {/*  <div className="flex items-center gap-4">*/}
          {/*    <Box className="h-5 w-5 text-purple-600" />*/}
          {/*    <div className="font-semibold">*/}
          {/*      Inventaire : {Object.values(entity.inventory).length} objets*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}

          {/*{Object.hasOwn(entity, "actions") && (*/}
          {/*  <div className="flex items-center gap-4">*/}
          {/*    <Activity className="h-5 w-5 text-red-600" />*/}
          {/*    <div className="font-semibold">*/}
          {/*      Actions : {Object.values(entity.actions).length} disponibles*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}

          {/*<div className="font-semibold">*/}
          {/*  Position :*/}
          {/*  <span className="font-normal">*/}
          {/*    {" "}*/}
          {/*    X: {entity.position.x}, Y: {entity.position.y}, Z: {entity.position.z}*/}
          {/*  </span>*/}
          {/*</div>*/}

          {/*<div className="font-semibold">*/}
          {/*  Taille :*/}
          {/*  <span className="font-normal">*/}
          {/*    {" "}*/}
          {/*    X: {entity.size.x}, Y: {entity.size.y}, Z: {entity.size.z}*/}
          {/*  </span>*/}
          {/*</div>*/}

          {/*{metaData?.propriety?.work && (*/}
          {/*  <div className="font-semibold">*/}
          {/*    Travailleurs :*/}
          {/*    <span className="font-normal">*/}
          {/*      {" "}*/}
          {/*      {entity.workers.length} / {metaData.propriety.work?.numberOfWorker}*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </CardContent>
    </Card>
  )
}
