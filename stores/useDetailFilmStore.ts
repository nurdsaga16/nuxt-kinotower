import { defineStore } from 'pinia'
import { api } from '~/api';

export const useDetailFilmStore = defineStore('detail', () => {
  const film = ref(null);
  const reviews = ref([]);
  const ratings = ref([]);
  const storedAuth = useAuthStore();

  async function fetchFilm(id: number) {
    const response = await api.get('/films/' + id);
    film.value = response.data.film;
  }

  async function fetchReviews(id: number) {
    const response = await api.get(`/films/${id}/reviews`);
    reviews.value = response.data.reviews;
  }

  async function fetchRatings(id: number) {
    const response = await api.get(`/films/${id}/ratings`);
    reviews.value = response.data.ratings;
  }

  async function addReview(filmId: number, message: string) {
    const response = await api.post(`/users/${storedAuth.authData.id}/reviews`, {
      'film_id': filmId,
      message,
    }, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
        'Accept': 'application/json',
      }
    });
    fetchReviews(film.value.id);
  }

  async function addRating(ball: number) {
    const response = await api.post(`/users/${storedAuth.authData.id}/ratings`, {
      'film_id': film.value.id,
      ball,
    }, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
    fetchFilm(film.value.id);
  }

  return {
    film,
    fetchFilm,
    reviews,
    fetchReviews,
    ratings,
    fetchRatings,
    addReview,
    addRating,
  }
})
