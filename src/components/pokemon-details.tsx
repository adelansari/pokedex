"use client"

import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PokemonDetailsProps {
  pokemon: Pokemon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PokemonDetails({ pokemon, open, onOpenChange }: PokemonDetailsProps) {
  if (!pokemon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px] bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold capitalize tracking-wider">
              {pokemon.name}
            </DialogTitle>
            <span className="text-sm font-mono text-muted-foreground">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
          </div>
        </DialogHeader>
        <div className="relative h-64 w-full">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="grid gap-6">
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                variant="secondary"
                className="font-mono text-xs"
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
          <div>
            <h4 className="mb-4 font-mono text-sm font-medium uppercase tracking-wider">Stats</h4>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono capitalize">{stat.stat.name}</span>
                    <span className="font-mono">{stat.base_stat}</span>
                  </div>
                  <Progress value={(stat.base_stat / 255) * 100} />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider">Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-mono">Height</span>
                  <span className="font-mono">{pokemon.height / 10}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">Weight</span>
                  <span className="font-mono">{pokemon.weight / 10}kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">Base Exp</span>
                  <span className="font-mono">{pokemon.base_experience}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider">Abilities</h4>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <Badge
                    key={ability.ability.name}
                    variant="outline"
                    className="font-mono text-xs"
                  >
                    {ability.ability.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 