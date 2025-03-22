import axios from 'axios';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const api = {
  async getPokemonList(offset = 0, limit = 20): Promise<PokemonListResponse> {
    const response = await axios.get(`${POKE_API_BASE_URL}/pokemon`, {
      params: { offset, limit },
    });
    return response.data;
  },

  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${id}`);
    return response.data;
  },

  async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${name}`);
    return response.data;
  },
}; 