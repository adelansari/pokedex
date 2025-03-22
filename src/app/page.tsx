'use client';

import { useEffect, useState } from 'react';
import { Pokemon } from '@/types/pokemon';
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
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"id" | "name">("id")

  const ITEMS_PER_PAGE = 12;
  const TOTAL_POKEMON = 151; // First generation only

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage');
      }
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await api.getPokemonList(offset, ITEMS_PER_PAGE);
      const pokemonDetails = await Promise.all(
        response.results.map((pokemon) =>
          api.getPokemonByName(pokemon.name)
        )
      );
      // Simply set the new Pokémon list instead of accumulating
      setPokemon(pokemonDetails.sort((a, b) => a.id - b.id));
    } catch (err) {
      setError('Failed to fetch Pokemon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [page]);

  const handleViewDetails = (pokemon: Pokemon) => {
    console.log('Opening details for:', pokemon.name)
    setSelectedPokemon(pokemon)
    setDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailsOpen(false)
    setSelectedPokemon(null)
  }

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favoriteId) => favoriteId !== id)
        : [...prev, id]
    )
  }

  const handleTypeSelect = (type: PokemonType) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filteredPokemon = pokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTypes = selectedTypes.length === 0 || 
      selectedTypes.every((type) =>
        pokemon.types.some((t) => t.type.name === type)
      );
    return matchesSearch && matchesTypes;
  });

  const totalPages = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1c]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2 text-white">{error}</p>
          <Button
            className="mt-4"
            onClick={() => {
              setError(null);
              setPage(1);
              setPokemon([]);
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
    <main className="relative h-screen w-screen overflow-hidden bg-[#1e90ff]">
      <div className="mx-auto flex h-full max-w-[800px] flex-col">
        {/* Header */}
        <div className="flex-none p-4">
          <h1 className="py-2 text-center text-4xl font-bold text-white">
            POKÉDEX
          </h1>

          {/* Search Bar */}
          <div className="flex">
            <Input
              type="text"
              placeholder="Search Pokemon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 flex-1 rounded-none border-0 bg-white px-2 text-sm text-black placeholder:text-gray-500 focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="h-8 rounded-none border-l border-gray-200 bg-white px-2 text-sm text-black hover:bg-gray-100"
            >
              Clear
            </Button>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-0 border-y border-white/20 bg-[#1e90ff] py-1">
            <TypeFilter
              selectedTypes={selectedTypes}
              onTypeSelect={handleTypeSelect}
            />
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-[#1f1f1f]">
          <div className="grid grid-cols-2 gap-[1px] bg-black/20 md:grid-cols-3">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onViewDetails={handleViewDetails}
                isFavorite={favorites.includes(pokemon.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>

        {/* Pagination - Fixed at bottom */}
        <div className="flex-none border-t border-white/20 bg-[#1e90ff] p-2">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
              className="h-8 rounded-none bg-white px-3 text-sm font-bold text-black hover:bg-gray-100"
            >
              ←
            </Button>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    setPage(page);
                  }
                }}
                className="w-12 border-0 bg-white px-2 py-1 text-center text-sm text-black"
              />
              <span className="text-sm text-white/90">/ {totalPages}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages || loading}
              className="h-8 rounded-none bg-white px-3 text-sm font-bold text-black hover:bg-gray-100"
            >
              →
            </Button>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-none border-t border-white/20 bg-[#1e90ff] py-1 text-center text-sm">
          <span className="text-white/90">© Adel Ansari - </span>
          <a
            href="https://github.com/adelansari/pokedex"
            className="text-[#98fb98] hover:underline"
          >
            Github Repo
          </a>
        </div>
      </div>

      {/* Pokemon Details Modal */}
      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          open={detailsOpen}
          onClose={handleCloseDetails}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
}
