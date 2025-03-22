import { cn } from "@/lib/utils";

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
] as const;

type PokemonType = typeof POKEMON_TYPES[number];

interface TypeFilterProps {
  selectedTypes: PokemonType[];
  onTypeSelect: (type: PokemonType) => void;
}

const typeColors: Record<PokemonType, { bg: string; text: string }> = {
  normal: { bg: 'bg-gray-500/10', text: 'text-gray-500' },
  fire: { bg: 'bg-red-500/10', text: 'text-red-500' },
  water: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  electric: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  grass: { bg: 'bg-green-500/10', text: 'text-green-500' },
  ice: { bg: 'bg-cyan-500/10', text: 'text-cyan-500' },
  fighting: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
  poison: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
  ground: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
  flying: { bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
  psychic: { bg: 'bg-pink-500/10', text: 'text-pink-500' },
  bug: { bg: 'bg-lime-500/10', text: 'text-lime-500' },
  rock: { bg: 'bg-yellow-700/10', text: 'text-yellow-700' },
  ghost: { bg: 'bg-purple-700/10', text: 'text-purple-700' },
  dragon: { bg: 'bg-indigo-700/10', text: 'text-indigo-700' },
  dark: { bg: 'bg-gray-700/10', text: 'text-gray-700' },
  steel: { bg: 'bg-gray-400/10', text: 'text-gray-400' },
  fairy: { bg: 'bg-pink-300/10', text: 'text-pink-300' },
};

export function TypeFilter({ selectedTypes, onTypeSelect }: TypeFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-sm font-medium">Filter by Type</h3>
      <div className="flex flex-wrap gap-2">
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type);
          const { bg, text } = typeColors[type];
          return (
            <button
              key={type}
              onClick={() => onTypeSelect(type)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                bg,
                text,
                isSelected && 'ring-2 ring-offset-2 ring-primary'
              )}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
} 