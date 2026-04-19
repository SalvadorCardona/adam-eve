import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { keysPressed } from "@/packages/ui/keysState"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { bloodEntityResource } from "@/app/entity/effect/blood/BloodEntityResource"
import { playerAttackActionResource } from "./playerAttackActionResource"
import { PlayerComponent } from "./PlayerComponent"
import healthyIcon from "./player_healthy.svg?url"

const PLAYER_SPEED = 0.08

export const playerEntityResource = createEntityResource({
  ["@id"]: "resource/player",
  entityType: EntityType.character,
  label: "Joueur",
  asset: {
    model2d: healthyIcon,
    icon: healthyIcon,
    asset2d: [healthyIcon],
  },
  propriety: {
    speed: PLAYER_SPEED,
    inventorySize: 20,
    attack: {
      damage: 5,
      attackRange: 1.5,
      attackSpeed: 30,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
    health: {
      maxLife: 100,
    },
    defaultActions: [playerAttackActionResource["@type"]!],
  },
  defaultEntity: () => ({ faction: EntityFaction.self }),
  component: PlayerComponent,
  onFrame: ({ entity, game }) => {
    let moved = false

    if (keysPressed["ArrowUp"]) {
      entity.position.z += PLAYER_SPEED
      entity.state = EntityState.move
      moved = true
    }
    if (keysPressed["ArrowDown"]) {
      entity.position.z -= PLAYER_SPEED
      entity.state = EntityState.move
      moved = true
    }
    if (keysPressed["ArrowLeft"]) {
      entity.position.x += PLAYER_SPEED
      entity.rotation = -1
      entity.state = EntityState.move
      moved = true
    }
    if (keysPressed["ArrowRight"]) {
      entity.position.x -= PLAYER_SPEED
      entity.rotation = 1
      entity.state = EntityState.move
      moved = true
    }

    if (!moved && entity.state === EntityState.move) {
      entity.state = EntityState.wait
    }

    if (moved) {
      updateEntityInGame(game, entity)
    }
  },
  onHit: ({ entity, game }) => {
    const blood = bloodEntityResource.create({
      game,
      item: { position: entity.position },
    })
    addEntityToGame(game, blood)
  },
})
