"use client"

import { Pokemon } from "@/types/pokemon"
import { Star } from "lucide-react"
import Image from "next/image"

interface PokemonCardProps {
  pokemon: Pokemon
  onViewDetails: (pokemon: Pokemon) => void
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function PokemonCard({
  pokemon,
  onViewDetails,
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  console.log('Rendering PokemonCard:', pokemon.name)

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails(pokemon);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(pokemon.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex aspect-[4/3] cursor-pointer flex-col bg-[#1f1f1f] hover:bg-[#2a2a2a]"
    >
      {/* Favorite Button */}
      <div 
        className="favorite-button absolute left-1 top-1 z-10"
        onClick={handleFavoriteClick}
      >
        <div className="flex h-4 w-4 items-center justify-center bg-white/10">
          <Star 
            className={`h-3 w-3 ${isFavorite ? "fill-[#98fb98]" : ""} text-[#98fb98]`}
          />
        </div>
      </div>

      {/* Pokemon Image */}
      <div className="relative flex-1">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Pokemon Name */}
      <div className="bg-[#2f2f2f] p-1 text-center">
        <h3 className="font-mono text-sm font-bold text-[#98fb98]">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
      </div>
    </div>
  )
} 