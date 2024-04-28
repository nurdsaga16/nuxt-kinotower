import { defineStore } from 'pinia'
import { api } from '~/api';

export const useProfileStore = defineStore('profile', () => {
  const userData = ref(null);
  const reviewsData = ref([]);
  const ratingsData = ref([]);
  const likes = ref([]);
  const dislikes = ref([]);
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

  async function fetchLikes(id: number, review_id: number) {
    const response = await api.get(`/films/${id}/reviews`);
    likes.value[review_id] = response.data.reviews[review_id].likes;
    dislikes.value[review_id] = response.data.reviews[review_id].dislikes;
  }

  async function addLike(id: number, reviewId: number) {
    const response = await api.post(`/films/${id}/reviews`, {
      review_id: reviewId,
      user_id: storedAuth.authData.id,
      like: 1,
    }, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchLikes(id, reviewId);
  }

  async function addDislike(id: number, reviewId: number) {
    const response = await api.post(`/films/${id}/reviews`, {
      review_id: reviewId,
      user_id: storedAuth.authData.id,
      like: 0,
    }, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchLikes(id, reviewId);
  }

  async function removeLike(id: number, reviewId: number) {
    const response = await api.delete(`/films/${id}/reviews/${reviewId}`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });

    await fetchLikes(id, reviewId);
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
    await api.delete(`/users`, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
    storedAuth.removeAuthData();
  }

  async function updateProfile(fio: string, email: string, birthday: string, gender_id: number) {
    const response = await api.put(`/users`, {
      fio,
      email,
      birthday,
      gender_id,
    }, {
      headers: {
        'Authorization': 'Bearer ' + storedAuth.authData.token,
      }
    });
  }


  fetchReviewsData();
  fetchRatingsData();

  return {
    userData,
    reviewsData,
    ratingsData,
    removeReviewsData,
    removeRatingsData,
    removeUserData,
    fetchUserData,
    updateProfile,
    fetchLikes,
    addLike,
    removeLike,
    addDislike,
    likes,
    dislikes,
  }
});