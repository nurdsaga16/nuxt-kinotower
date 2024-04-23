import { defineStore } from 'pinia'
import { api } from '~/api';

export const useProfileStore = defineStore('profile', () => {
  const userData = ref(null);
  const reviewsData = ref([]);
  const ratingsData = ref([]);
  const storedAuth = useAuthStore();

  async function fetchUserData(id: number) {
    const response = await api.get(`/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
    userData.value = response.data;
  }

  async function fetchReviewsData() {
    const response = await api.get(`/users/${storedAuth.authData.id}/reviews`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
    reviewsData.value = response.data.reviews;
  }

  async function fetchRatingsData() {
    const response = await api.get(`/users/${storedAuth.authData.id}/ratings`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
    ratingsData.value = response.data.ratings;
  }

  async function removeReviewsData(id: number) {

    await api.delete(`/users/${storedAuth.authData.id}/reviews/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchReviewsData();
  }

  async function removeRatingsData(id: number) {

    await api.delete(`/users/${storedAuth.authData.id}/ratings/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchRatingsData();
  }

  async function removeUserData() {
    await api.delete(`/users/${storedAuth.authData.id}`, {
        headers: {
            'Authorization': 'Bearer ' + storedAuth.authData.token,
        }
    });

    await fetchUserData(storedAuth.authData.id);
}


  fetchUserData(storedAuth.authData.id);
  fetchReviewsData();
  fetchRatingsData();

  return {
    userData,
    reviewsData,
    ratingsData,
    removeReviewsData,
    removeRatingsData,
    removeUserData,
  }
});