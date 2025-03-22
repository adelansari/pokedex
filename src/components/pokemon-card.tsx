"use client"

import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Heart } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onViewDetails: (pokemon: Pokemon) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onViewDetails, isFavorite = false, onToggleFavorite }: PokemonCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-card transition-all hover:border-primary/40 hover:shadow-lg">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold capitalize tracking-wider">{pokemon.name}</h3>
          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onToggleFavorite(pokemon)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                  }`}
                />
                <span className="sr-only">
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </Button>
            )}
            <span className="text-sm font-mono text-muted-foreground">#{String(pokemon.id).padStart(3, '0')}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative mx-auto h-32 w-32">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
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
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className="w-full font-mono"
          onClick={() => onViewDetails(pokemon)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
} 