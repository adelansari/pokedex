'use client';

import { useEffect, useState } from 'react';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';
import { api } from '@/lib/api';
import { PokemonCard } from '@/components/pokemon-card';
import { PokemonDetails } from '@/components/pokemon-details';
import { TypeFilter } from '@/components/type-filter';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' |
  'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' |
  'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await api.getPokemonList(offset);
      const pokemonDetails = await Promise.all(
        response.results.map((pokemon) =>
          api.getPokemonByName(pokemon.name)
        )
      );
      setPokemonList((prev) => [...prev, ...pokemonDetails]);
      setHasMore(!!response.next);
    } catch (err) {
      setError('Failed to fetch Pokemon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + 20);
  };

  const handleViewDetails = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setDetailsOpen(true);
  };

  const handleTypeSelect = (type: PokemonType) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      prev.includes(pokemon.id)
        ? prev.filter((id) => id !== pokemon.id)
        : [...prev, pokemon.id]
    );
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTypes = selectedTypes.length === 0 || 
      selectedTypes.every((type) =>
        pokemon.types.some((t) => t.type.name === type)
      );
    return matchesSearch && matchesTypes;
  });

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2">{error}</p>
          <Button
            className="mt-4"
            onClick={() => {
              setError(null);
              setOffset(0);
              setPokemonList([]);
              fetchPokemon();
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
        <ThemeToggle />
      </div>
      
      <div className="mb-8 grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Pokemon..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TypeFilter
          selectedTypes={selectedTypes}
          onTypeSelect={handleTypeSelect}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onViewDetails={handleViewDetails}
            isFavorite={favorites.includes(pokemon.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      )}

      {hasMore && !loading && !searchQuery && selectedTypes.length === 0 && (
        <div className="mt-8 text-center">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}

      <PokemonDetails
        pokemon={selectedPokemon}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </main>
  );
}
