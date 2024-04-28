<script lang="ts" setup>

const storedFilms = useFilmsStore();
const storedCategories = useCategoriesStore();
const storedCountries = useCountriesStore();
const storedFavorites = useFavoritesStore();

const category = ref(null);
watch(category, (newCategory) => {
  storedFilms.addCategoriesToParams(newCategory);
});
const country = ref(null);
watch(country, (newCountry) => {
  storedFilms.addCountriesToParams(newCountry);
});
const sortBy = ref('name');
watch(sortBy, (newSortBy) => {
  storedFilms.addSortToParams(newSortBy);
})
const resetParams = () => {
  category.value = null;
  country.value = null;
  sortBy.value = 'name';

  storedFilms.fetchFilms();
}

const searchQuery = ref('');
const filteredFilms = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return storedFilms.films.filter(film => film.name.toLowerCase().startsWith(query));
});

const selectCategory = (categoryId: number) => {
  category.value = categoryId;
};
const selectCountry = (countryId: number) => {
  country.value = countryId;
}

const toggleFavorite = (filmId: number) => {
  if (storedFavorites.isFavorite(filmId)) {
    storedFavorites.removeFavoritesData(filmId);
  } else {
    storedFavorites.addFavorite(filmId);
  }
};

storedFilms.fetchFilms();
</script>

<template>
  <div class="container mb-4">
    <div class="row mt-2">
      <!-- Фильтры слева -->
      <div class="col-md-3 bg-dark rounded-3" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="row flex-column">
          <div class="col mb-3">
            <div class="col mb-3">
              <input type="search" class="form-control" aria-label="Search" placeholder="Поиск" v-model="searchQuery">
            </div>
          </div>
          <div class="col mb-3">
            <div class="filter">
              <h5 class="filter-header">Все жанры</h5>
              <a href="#" style="text-decoration: none;" class="filter"
                v-for="categoryItem in storedCategories.categories" :key="categoryItem.id"
                :class="{ 'active': categoryItem.id === category }" @click.prevent="selectCategory(categoryItem.id)">
                {{ categoryItem.name }} ({{ categoryItem.filmCount }})
              </a>
            </div>
          </div>
          <div class="col mb-3">
            <div class="filter">
              <h5 class="filter-header">Все страны</h5>
              <a href="#" style="text-decoration: none;" class="filter" v-for="countryItem in storedCountries.countries"
                :key="countryItem.id" :class="{ 'active': countryItem.id === country }"
                @click.prevent="selectCountry(countryItem.id)">
                {{ countryItem.name }}
              </a>
            </div>
          </div>
          <div class="col mb-3">
            <div class="filter">
              <h5 class="filter-header">Сортировка</h5>
              <a href="#" style="text-decoration: none;" class="filter" @click.prevent="sortBy = 'name'"
                :class="{ 'active': sortBy === 'name' }">По именам</a>
              <a href="#" style="text-decoration: none;" class="filter" @click.prevent="sortBy = 'year'"
                :class="{ 'active': sortBy === 'year' }">По годам</a>
              <a href="#" style="text-decoration: none;" class="filter" @click.prevent="sortBy = 'rating'"
                :class="{ 'active': sortBy === 'rating' }">По рейтингу</a>
            </div>
          </div>
          <div class="col">
            <a class="text-decoration-none">
              <button class="btn reset" @click="resetParams">Сбросить</button>
            </a>
          </div>
        </div>
      </div>


      <div class="d-flex justify-content-center" v-if="storedFilms.isLoading">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="col-md-9" v-else>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col" v-for="film in filteredFilms" :key="film.id">
            <div class="card h-100">
              <div style="position: relative;">
                <div @click="$router.push('/films/' + film.id)"><img :src="film.link_img" class="card-img-top" alt="..." height="450" width="322"></div>
                <i :class="{ 'fa-solid fa-bookmark': storedFavorites.isFavorite(film.id), 'fa-regular fa-bookmark': !storedFavorites.isFavorite(film.id) }"
                  @click="toggleFavorite(film.id)"></i>
              </div>

              <div class="card-body">
                <div @click="$router.push('/films/' + film.id)">
                  <h5 class="card-title d-flex align-items-center" style="color: #8A13FC;">
                    {{ film.name }}
                    <span class="text-dark ms-2 fs-6">({{ film.year_of_issue }})</span>
                  </h5>
                </div>
                <p class="card-text">{{ film.duration }} мин.</p>
                <p class="card-text" v-if="film.categories.length != 0">Жанры: <template
                    v-for="(genre, index) in film.categories" :key="genre.id">
                    {{ (index != film.categories.length - 1) ? genre.name + ', ' : genre.name }}
                  </template></p>
                <p class="card-text" v-else>Нет жанров</p>
                <p class="card-text m-0">Рейтинг: {{ film.ratingAvg }}</p>
              </div>
              <div class="card-footer text-center">
                <small class="text-body-secondary">
                  <a class="text-decoration-none">
                    <button class="btn reset me-3">Смотреть</button>
                  </a>
                  <a class="text-decoration-none">
                    <button @click="$router.push('/films/' + film.id)" class="btn bg-dark" style="color: white;">О
                      фильме</button>
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <nav aria-label="Page navigation example" class="mt-4 d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" :class="{ 'disabled': storedFilms.page - 1 == 0 }" href="#" aria-label="Previous"
                @click.prevent="storedFilms.changePage(storedFilms.page - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in Math.ceil(storedFilms.total / storedFilms.size)" :key="page">
              <a class="page-link" :class="{ 'active': page == storedFilms.page }" href="#"
                @click.prevent="storedFilms.changePage(page)">
                {{ page }}
              </a>
            </li>
            <li class="page-item">
              <a class="page-link"
                :class="{ 'disabled': storedFilms.page + 1 > Math.ceil(storedFilms.total / storedFilms.size) }" href="#"
                aria-label="Next" @click.prevent="storedFilms.changePage(storedFilms.page + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>


<style>
.pagination .page-link {
  color: #8A13FC;
}

.pagination .page-link:hover {
  color: rgba(94, 1, 181, 0.8);
}

.pagination .page-item.active .page-link {
  background-color: #8A13FC;
  border-color: #8A13FC;
}

.pagination .page-item .page-link.disabled {
  color: #6c757d;
}

.pagination .page-item .page-link.active {
  background-color: #8A13FC;
  border-color: #8A13FC;
  color: white;
}

.pagination .page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(94, 1, 181, 0.2);
}

.carousel-caption h5 {
  font-size: 4rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 10px 20px;
  transition: all 0.3s ease;
  /* Анимация при изменении свойств */
}

.carousel-caption h5:hover {
  color: #8A13FC;
}

.carousel-caption p {
  font-size: 1.1rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 10px 20px;
  transition: all 0.3s ease;
  /* Анимация при изменении свойств */
}

.carousel-caption p:hover {
  color: #8A13FC;
}

.btn.reset {
  background-color: #8A13FC;
  color: white;
}

.btn.reset:hover {
  background-color: rgba(94, 1, 181, 0.8);
}

.filter {
  display: block;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.filter:hover {
  color: #ccc;
}

.filter.active {
  display: inline-block;
  /* Позволяет контейнеру занимать только необходимое пространство */
  background-color: #8A13FC;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
}

.filter-header {
  color: #b473f0;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(94, 1, 181, 0.4);
}

.fa-solid.fa-bookmark {
  color: white;
  position: absolute; 
  top: 0px; 
  right: 0px;
  font-size: 40px;
  background-color: #8A13FC;
  padding: 10px 10px;
}

.fa-regular.fa-bookmark {
  color: white;
  position: absolute; 
  top: 0px; 
  right: 0px;
  font-size: 40px;
  background-color: #8A13FC;
  padding: 10px 10px;
  border-bottom-left-radius: 10px;
}
</style>