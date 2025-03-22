"use client"

import { Pokemon } from "@/types/pokemon"
import Image from "next/image"

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

interface PokemonDetailsProps {
  pokemon: Pokemon | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onFavoriteToggle: (id: number) => void
  isFavorite: boolean
}

export function PokemonDetails({
  pokemon,
  open,
  onOpenChange,
  onFavoriteToggle,
  isFavorite
}: PokemonDetailsProps) {
  console.log('PokemonDetails render:', { pokemon, open });

  if (!open || !pokemon) {
    console.log('PokemonDetails not rendering:', { pokemon, open });
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div 
        className="relative mx-4 w-full max-w-md rounded-lg bg-[#1a1a1a] p-4 font-mono shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-2 top-2 text-xl text-white/60 hover:text-white"
        >
          ×
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle(pokemon.id)}
          className="absolute right-8 top-2 text-xl text-yellow-400 hover:text-yellow-300"
        >
          {isFavorite ? "★" : "☆"}
        </button>

        {/* Pokemon Image */}
        <div className="relative mx-auto mb-4 aspect-square w-32">
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 128px, 128px"
            className="object-contain"
            priority
          />
        </div>

        {/* Pokemon Info */}
        <div className="text-white">
          <h2 className="mb-3 text-center text-xl font-bold uppercase">
            {pokemon.name}
          </h2>
          
          <div className="mb-4">
            <div className="mb-1 text-sm text-white/60">Types</div>
            <div className="flex justify-center gap-2">
              {pokemon.types.map((type) => {
                const typeColor = typeColors[type.type.name] || { bg: "#2a2a2a", text: "#FFFFFF" }
                return (
                  <span
                    key={type.type.name}
                    className="rounded px-2 py-0.5 text-sm"
                    style={{
                      backgroundColor: typeColor.bg,
                      color: typeColor.text
                    }}
                  >
                    {type.type.name}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white/60">Height</div>
              <div>{pokemon.height / 10} m</div>
            </div>
            <div>
              <div className="text-white/60">Weight</div>
              <div>{pokemon.weight / 10} kg</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-sm text-white/60">Base Stats</div>
            <div className="grid gap-1">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="grid grid-cols-[100px_1fr] gap-2">
                  <div className="text-sm text-white/80">
                    {stat.stat.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                    <div className="w-6 text-right text-sm">
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 