import { defineStore } from 'pinia'
import { api } from '~/api';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([]);
  const storedAuth = useAuthStore();

  async function fetchFavorites() {
    const response = await api.get(`users/${storedAuth.authData.id}/favorites`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
    favorites.value = response.data.favorites;
  }

  async function addFavorite(filmId: number) {
    await api.post(`/users/${storedAuth.authData.id}/favorites`, 
    { 
      "film_id": filmId ,
      "user_id": storedAuth.authData.id,
    }, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchFavorites();
  }

  const isFavorite = computed(() => (filmId:number) => {
    return favorites.value.some(favorite => favorite.id == filmId);
  });


  async function removeFavoritesData(id: number) {

    await api.delete(`/users/${storedAuth.authData.id}/favorites/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchFavorites();
  }

  fetchFavorites();

  return {
    favorites,
    removeFavoritesData,
    addFavorite,
    isFavorite,
  }
})
