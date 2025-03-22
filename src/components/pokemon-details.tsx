import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PokemonDetailsProps {
  pokemon: Pokemon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PokemonDetails({ pokemon, open, onOpenChange }: PokemonDetailsProps) {
  if (!pokemon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{pokemon.name}</DialogTitle>
        </DialogHeader>
        <div className="relative h-64 w-full">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Stats</h4>
              <div className="mt-2 space-y-1">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex justify-between">
                    <span className="capitalize">{stat.stat.name}:</span>
                    <span>{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium">Details</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span>{pokemon.height / 10}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>{pokemon.weight / 10}kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Experience:</span>
                  <span>{pokemon.base_experience}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Abilities</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="rounded-full bg-secondary px-2 py-1 text-xs font-medium"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 