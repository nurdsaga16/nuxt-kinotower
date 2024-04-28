import { defineStore } from 'pinia'
import { api } from '~/api';

export const useActorsStore = defineStore('actors', () => {
  const actors = ref([]);

  async function fetchActors(filmId:number) {
    const response = await api.get(`films/${filmId}/actors`);
    actors.value = response.data.actors;
  }

  return {
    actors,
    fetchActors,
  }
})
