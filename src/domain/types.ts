interface Town {
  id: string
  name: string
  buildings: Building[]

  position: {
    position: string
    left: string
    top: string
  }
}

interface Building {
  id: string
  name: string
  address: string
  rooms: Room[]
}

interface Room {
  id: string
  name: string
  loot: Item[]
}

interface Item {
  id: string
  label: string
}

interface BuildingType {
  name: string
  avgRooms: number
  rarity: number
}

export type { Town, Building, Room, Item, BuildingType }
