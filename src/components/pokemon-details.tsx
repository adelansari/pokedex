"use client"

import { Pokemon } from "@/types/pokemon"
import { Star, X } from "lucide-react"
import Image from "next/image"

interface PokemonDetailsProps {
  pokemon: Pokemon
  open: boolean
  onClose: () => void
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function PokemonDetails({
  pokemon,
  open,
  onClose,
  isFavorite,
  onToggleFavorite,
}: PokemonDetailsProps) {
  if (!open || !pokemon) return null

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#1f1f1f',
        padding: '2rem',
        borderRadius: '0.5rem',
        position: 'relative',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <X size={24} />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(pokemon.id)}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '1rem',
            background: 'none',
            border: 'none',
            color: '#98fb98',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <Star size={24} fill={isFavorite ? '#98fb98' : 'none'} />
        </button>

        {/* Pokemon Image */}
        <div style={{
          width: '200px',
          height: '200px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Pokemon Name */}
        <h2 style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#98fb98',
          marginTop: '1rem'
        }}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>

        {/* Types */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                backgroundColor: getTypeColor(type.type.name),
                color: getTypeTextColor(type.type.name)
              }}
            >
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '6rem',
                fontSize: '0.875rem',
                color: '#9ca3af'
              }}>
                {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
              </span>
              <div style={{
                flex: 1,
                height: '0.5rem',
                backgroundColor: '#374151',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: '#98fb98',
                    borderRadius: '9999px',
                    width: `${(stat.base_stat / 255) * 100}%`
                  }}
                />
              </div>
              <span style={{
                width: '3rem',
                textAlign: 'right',
                fontSize: '0.875rem',
                color: 'white'
              }}>
                {stat.base_stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#F0B6BC"
  }
  return colors[type] || "#A8A878"
}

function getTypeTextColor(type: string): string {
  const darkTypes = ['fighting', 'poison', 'ghost', 'dragon', 'dark']
  return darkTypes.includes(type) ? '#FFFFFF' : '#000000'
} 