import { defineStore } from 'pinia'
import { api } from '~/api';

export const useFilmsStore = defineStore('films', () => {
  const films = ref([]);
  const page = ref(1);
  const total = ref(0);
  const size = 3;
  const isLoading = ref(true);
  const params: {
    category:number|null,
    country:number|null,
    sortBy:string,
    sortDir:string,
    size:number,
    page:number
  } = {
    category: null,
    country: null,
    sortBy: 'name',
    sortDir: 'desc',
    page: 1,
    size
  };

  function addCategoriesToParams(category:number|null) {
      params.category = category;
      page.value = 1;
      params.page = 1;
      fetchFilms();
  }

  function addCountriesToParams(country:number|null) {
    params.country = country;
    page.value = 1;
    params.page = 1;
    fetchFilms();
  }

  function addSortToParams(sortBy:string) {
    params.sortBy = sortBy;
    fetchFilms();
  }

  function changePage(pages:number) {
    page.value = pages;
    params.page = pages;
    fetchFilms();
  }

  async function fetchFilms() {
    const response = await api.get('/films', {params});
    isLoading.value = false;
    films.value = response.data.films;
    total.value = response.data.total;
  }

  return {
    films, 
    fetchFilms,
    addCategoriesToParams,
    addCountriesToParams,
    addSortToParams,
    total,
    size,
    page,
    changePage,
    isLoading
  }
})
