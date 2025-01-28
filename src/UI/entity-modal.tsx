import React, { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Box, Leaf, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import useGameContext from "@/src/UI/provider/useGameContext"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"

interface EntityModalProps {}

// https://v0.dev/chat/b/b_i0Y0LFnf5uc?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..qvy90R5EB5YDdo3f.M41-4rBWiu9rhbr6BLxKn8JI1Ty0SJcnTppnRsaF3wqiD97so3TEoo1ZMxU.JPOThbtudLde243zJ0PjWQ
export const EntityModal: React.FC<EntityModalProps> = () => {
  const [entity, setEntity] = useState<EntityInterface | undefined>()

  const game = useGameContext().game
  useGamePubSub(appLdType.userControl, (e) => {
    if (game.userControl.entitiesSelected.length) {
      setEntity(
        entityQueryFindOne(game, { "@id": game.userControl.entitiesSelected[0] }),
      )

      return
    }

    setEntity(undefined)
  })

  if (!entity) return

  const metaData = getMetaData<EntityMetaDataInterface>(entity)
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

          {entity.faction && (
            <div className="flex items-center gap-4">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div className="font-semibold">Faction : {entity.faction}</div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Box className="h-5 w-5 text-purple-600" />
            <div className="font-semibold">Etat : {entity.state}</div>
          </div>

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

          {entity?.state && (
            <div className="font-semibold">
              État :<span className="font-normal capitalize"> {entity.state}</span>
            </div>
          )}

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
