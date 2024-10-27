import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { usCities } from '@/const/usCities'
import { buildingTypes } from '@/const/buildingTypes'

import type { Town, Building, BuildingType, Room } from '@/domain/types'
import { streetNames } from '@/const/streetNames'

interface State {
  towns: Town[]
}

export const useGameStore = defineStore('gameStore', {
  state: (): State => ({
    towns: [],
  }),

  getters: {
    getTown: state => {
      return (townId: string) => state.towns.find(town => town.id === townId)
    },

    getBuilding: state => {
      return (buildingId: string, townId: string) =>
        state.towns
          .find(town => town.id === townId)
          ?.buildings.find(building => building.id === buildingId)
    },
  },

  actions: {
    generateTown(): Town {
      const newTown = {
        id: uuidv4(),
        name: usCities[Math.floor(Math.random() * usCities.length)],
        buildings: [],
        position: this.getRandomPosition(),
      }

      for (let i = 0; i < 7; i++) {
        const commonStreetName =
          streetNames[Math.floor(Math.random() * streetNames.length)]
        const commonStreetBuildingsCount = Math.floor(Math.random() * 7) + 6

        for (let j = 1; j < commonStreetBuildingsCount; j++) {
          const newBuild = this.generateBuilding(newTown.name, commonStreetName)

          newTown.buildings.push(newBuild)
        }
      }

      return newTown
    },

    getRandomPosition() {
      const x = Math.random() * 80 + 10
      const y = Math.random() * 80 + 10
      return {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
      }
    },

    generateBuilding(townName: string, streetName?: string): Building {
      const buildingType = this.getRandomBuildingType()
      const address = this.generateAddress(townName, streetName)
      const newBuilding = {
        id: uuidv4(),
        name: buildingType.name,
        address: address,
        rooms: this.generateRooms(buildingType.avgRooms, address),
      }
      return newBuilding
    },

    getRandomBuildingType(): BuildingType {
      const totalRarity = buildingTypes.reduce(
        (sum, type) => sum + type.rarity,
        0,
      )
      const random = Math.random() * totalRarity
      let cumulativeRarity = 0

      for (const buildingType of buildingTypes) {
        cumulativeRarity += buildingType.rarity
        if (random < cumulativeRarity) {
          return buildingType
        }
      }

      return buildingTypes[0]
    },

    generateAddress(townName: string, streetName?: string): string {
      const street =
        streetName ||
        streetNames[Math.floor(Math.random() * streetNames.length)]
      const streetNumber = Math.floor(Math.random() * 100) + 1
      return `${streetNumber} ${street}, ${townName}`
    },

    generateRooms(avgRooms: number, address: string): Room[] {
      const roomsCount =
        Math.floor(Math.random() * (avgRooms * 2 - avgRooms / 2 + 1)) +
        Math.floor(avgRooms / 2)
      const rooms: Room[] = []
      for (let i = 0; i < roomsCount; i++) {
        rooms.push({
          id: uuidv4(),
          name: `${address} - Apt ${i + 1}`,
          loot: [],
        })
      }
      return rooms
    },

    async gameInitialization(numberOfTowns: number) {
      for (let i = 0; i < numberOfTowns; i++) {
        this.towns.push(this.generateTown())
      }
    },
  },
})
