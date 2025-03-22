"use client"

import { Badge } from '@/components/ui/badge';

type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' |
  'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' |
  'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

const typeColors: Record<PokemonType, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-blue-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

interface TypeFilterProps {
  selectedTypes: PokemonType[];
  onTypeSelect: (type: PokemonType) => void;
}

export function TypeFilter({ selectedTypes, onTypeSelect }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(typeColors) as PokemonType[]).map((type) => (
        <Badge
          key={type}
          variant={selectedTypes.includes(type) ? 'default' : 'outline'}
          className={`cursor-pointer font-mono text-xs capitalize transition-colors ${
            selectedTypes.includes(type) ? `${typeColors[type]} text-white` : ''
          }`}
          onClick={() => onTypeSelect(type)}
        >
          {type}
        </Badge>
      ))}
    </div>
  );
} 