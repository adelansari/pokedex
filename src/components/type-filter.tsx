"use client"

const typeColors: { [key: string]: { bg: string; text: string } } = {
  normal: { bg: "#A8A878", text: "#FFFFFF" },
  fire: { bg: "#F08030", text: "#FFFFFF" },
  water: { bg: "#6890F0", text: "#FFFFFF" },
  electric: { bg: "#F8D030", text: "#000000" },
  grass: { bg: "#78C850", text: "#FFFFFF" },
  ice: { bg: "#98D8D8", text: "#000000" },
  fighting: { bg: "#C03028", text: "#FFFFFF" },
  poison: { bg: "#A040A0", text: "#FFFFFF" },
  ground: { bg: "#E0C068", text: "#000000" },
  flying: { bg: "#A890F0", text: "#000000" },
  psychic: { bg: "#F85888", text: "#FFFFFF" },
  bug: { bg: "#A8B820", text: "#FFFFFF" },
  rock: { bg: "#B8A038", text: "#FFFFFF" },
  ghost: { bg: "#705898", text: "#FFFFFF" },
  dragon: { bg: "#7038F8", text: "#FFFFFF" },
  dark: { bg: "#705848", text: "#FFFFFF" },
  steel: { bg: "#B8B8D0", text: "#000000" },
  fairy: { bg: "#EE99AC", text: "#000000" }
}

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"

interface TypeFilterProps {
  selectedTypes: PokemonType[]
  onTypeSelect: (type: PokemonType) => void
}

export function TypeFilter({ selectedTypes, onTypeSelect }: TypeFilterProps) {
  const types: PokemonType[] = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {types.map((type) => {
        const typeColor = typeColors[type]
        const isSelected = selectedTypes.includes(type)
        return (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className="relative rounded px-2 py-0.5 text-sm font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: typeColor.bg,
              color: typeColor.text,
              boxShadow: isSelected ? `0 0 0 2px #fff` : 'none',
              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {type}
          </button>
        )
      })}
    </div>
  )
} 