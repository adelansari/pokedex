import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import { Button } from './ui/button';

interface PokemonCardProps {
  pokemon: Pokemon;
  onViewDetails: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onViewDetails }: PokemonCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => onViewDetails(pokemon)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
} 