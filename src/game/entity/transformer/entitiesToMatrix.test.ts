import EntityInterface from "@/src/game/entity/EntityInterface"
import { entitiesToMatrix } from "@/src/game/entity/transformer/entitiesToMatrix"
import { JsonLdIriContainerInterface } from "@/src/utils/jsonLd/jsonLd"

// @ts-ignore
const entities: JsonLdIriContainerInterface<EntityInterface> = {
  "entity/ground/grass/1ua3tcn": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1ua3tcn",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1kmjpa4",
      right: "entity/ground/grass/i4oe1a",
      bottomRight: "entity/ground/grass/1gyk3vu",
    },
    createdAt: 289,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  "entity/ground/grass/1kmjpa4": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1kmjpa4",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/1ua3tcn",
      right: "entity/ground/grass/1gyk3vu",
      topRight: "entity/ground/grass/i4oe1a",
    },
    createdAt: 289,
    position: {
      x: 0,
      y: 0,
      z: 50,
    },
  },
  "entity/ground/grass/i4oe1a": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/i4oe1a",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1gyk3vu",
      left: "entity/ground/grass/1ua3tcn",
      bottomLeft: "entity/ground/grass/1kmjpa4",
    },
    createdAt: 289,
    position: {
      x: 50,
      y: 0,
      z: 0,
    },
  },
  "entity/ground/grass/1gyk3vu": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1gyk3vu",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/i4oe1a",
      left: "entity/ground/grass/1kmjpa4",
      topLeft: "entity/ground/grass/1ua3tcn",
    },
    createdAt: 289,
    position: {
      x: 50,
      y: 0,
      z: 50,
    },
  },
  "entity/ground/grass/1cn05xu": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1cn05xu",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1mk2gve",
      right: "entity/ground/grass/5y8q2v",
      bottomRight: "entity/ground/grass/19kx1ln",
    },
    createdAt: 361,
    position: {
      x: 150,
      y: 0,
      z: 0,
    },
  },
  "entity/ground/grass/1mk2gve": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1mk2gve",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/1cn05xu",
      right: "entity/ground/grass/19kx1ln",
      topRight: "entity/ground/grass/5y8q2v",
    },
    createdAt: 361,
    position: {
      x: 150,
      y: 0,
      z: 50,
    },
  },
  "entity/ground/grass/5y8q2v": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/5y8q2v",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/19kx1ln",
      left: "entity/ground/grass/1cn05xu",
      bottomLeft: "entity/ground/grass/1mk2gve",
    },
    createdAt: 361,
    position: {
      x: 200,
      y: 0,
      z: 0,
    },
  },
  "entity/ground/grass/19kx1ln": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/19kx1ln",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/5y8q2v",
      left: "entity/ground/grass/1mk2gve",
      topLeft: "entity/ground/grass/1cn05xu",
    },
    createdAt: 361,
    position: {
      x: 200,
      y: 0,
      z: 50,
    },
  },
  "entity/ground/grass/5r15cq": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/5r15cq",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1aiea9t",
      right: "entity/ground/grass/1c8lgv2",
      bottomRight: "entity/ground/grass/1goii9m",
    },
    createdAt: 448,
    position: {
      x: 0,
      y: 0,
      z: 150,
    },
  },
  "entity/ground/grass/1aiea9t": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1aiea9t",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/5r15cq",
      right: "entity/ground/grass/1goii9m",
      topRight: "entity/ground/grass/1c8lgv2",
    },
    createdAt: 448,
    position: {
      x: 0,
      y: 0,
      z: 200,
    },
  },
  "entity/ground/grass/1c8lgv2": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1c8lgv2",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1goii9m",
      left: "entity/ground/grass/5r15cq",
      bottomLeft: "entity/ground/grass/1aiea9t",
    },
    createdAt: 448,
    position: {
      x: 50,
      y: 0,
      z: 150,
    },
  },
  "entity/ground/grass/1goii9m": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1goii9m",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/1c8lgv2",
      left: "entity/ground/grass/1aiea9t",
      topLeft: "entity/ground/grass/5r15cq",
    },
    createdAt: 448,
    position: {
      x: 50,
      y: 0,
      z: 200,
    },
  },
  "entity/ground/grass/19deazx": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/19deazx",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1c7y11r",
      right: "entity/ground/grass/1up6cyz",
      bottomRight: "entity/ground/grass/1ojq4u",
    },
    createdAt: 523,
    position: {
      x: 150,
      y: 0,
      z: 150,
    },
  },
  "entity/ground/grass/1c7y11r": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1c7y11r",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/19deazx",
      right: "entity/ground/grass/1ojq4u",
      topRight: "entity/ground/grass/1up6cyz",
    },
    createdAt: 523,
    position: {
      x: 150,
      y: 0,
      z: 200,
    },
  },
  "entity/ground/grass/1up6cyz": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1up6cyz",
    "@version": 2,
    rotation: 0,
    connections: {
      bottom: "entity/ground/grass/1ojq4u",
      left: "entity/ground/grass/19deazx",
      bottomLeft: "entity/ground/grass/1c7y11r",
    },
    createdAt: 523,
    position: {
      x: 200,
      y: 0,
      z: 150,
    },
  },
  "entity/ground/grass/1ojq4u": {
    "@type": "entity/ground/grass",
    "@id": "entity/ground/grass/1ojq4u",
    "@version": 2,
    rotation: 0,
    connections: {
      top: "entity/ground/grass/1up6cyz",
      left: "entity/ground/grass/1c7y11r",
      topLeft: "entity/ground/grass/19deazx",
    },
    createdAt: 523,
    position: {
      x: 200,
      y: 0,
      z: 200,
    },
  },
}

describe("Test gameEntitiesToMatrix", () => {
  it("Context 1", () => {
    const matrix = entitiesToMatrix(Object.values(entities))
    expect(a).toEqual(1)
  })
})
