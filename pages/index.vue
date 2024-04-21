<script lang="ts" setup>

const storedFilms = useFilmsStore();
const storedCategories = useCategoriesStore();
const storedCountries = useCountriesStore();


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

const selectCategory = (categoryId) => {
  category.value = categoryId;
};
const selectCountry = (countryId) => {
  country.value = countryId;
}

storedFilms.fetchFilms();
</script>

<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
        aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
        aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
        aria-label="Slide 5"></button>
    </div>
    <div class="carousel-inner rounded-3">
      <div class="carousel-item active">
        <img
          src="https://avatars.dzeninfra.ru/get-zen_doc/10349846/pub_649ec89677a923534ae6e405_649ecc076a9fab54e4a6eb81/scale_1200"
          height="600vh" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Форрест Гамп</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://www.pluggedin.ru/images/144-bigTopImage.jpeg" height="600vh" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Темный рыцарь</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="https://kinotv.ru/upload/delight.webpconverter/upload/iblock/5d3/5d3992049cc80d9672aca03522581296/bdde9ff8867903fa1d5442424735e08e.jpg.webp?1700052409143424"
          height="600vh" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Начало</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://static.sweet.tv/images/cache/movie_banners/BCPYQAISAJ2WWIAC/17439-interstellar_1280x720.jpg"
          height="600vh" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Интерстеллар</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://thumbs.dfs.ivi.ru/storage30/contents/c/c/e934645a5e1cc379ebd22e1a3bd3fa.jpg/858x483/?q=85"
          height="600vh" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>1+1</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <div class="container mt-4 mb-4">
    <div class="row mt-5">
      <!-- Фильтры слева -->
      <div class="col-md-3 bg-dark rounded-3" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="row flex-column">
          <div class="col mb-3">
            <div class="col mb-3">
              <input type="text" class="form-control" placeholder="Поиск" v-model="searchQuery">
            </div>
          </div>
          <div class="col mb-3">
            <div class="filter">
              <h5 class="filter-header">Все жанры</h5>
              <a href="#" style="text-decoration: none;"  class="filter"
                v-for="categoryItem in storedCategories.categories" :key="categoryItem.id"
                :class="{ 'active': categoryItem.id === category }" 
                @click.prevent="selectCategory(categoryItem.id)">
                {{ categoryItem.name }} ({{ categoryItem.filmCount }})
              </a>
            </div>
          </div>
          <div class="col mb-3">
            <div class="filter">
              <h5 class="filter-header">Все страны</h5>
              <a href="#" style="text-decoration: none;"  class="filter"
                v-for="countryItem in storedCountries.countries" :key="countryItem.id"
                :class="{ 'active': countryItem.id === country }" 
                @click.prevent="selectCountry(countryItem.id)">
                {{ countryItem.name }}
              </a>
            </div>
          </div>
          <div class="col mb-3">
            <select class="form-select" v-model="sortBy">
              <option selected value="name">Сортировка по именам</option>
              <option value="year">Сортировка по годам</option>
              <option value="rating">Сортировка по рейтингу</option>
            </select>
          </div>
          <div class="col">
            <a class="text-decoration-none">
              <button class="btn reset" @click="resetParams">Сбросить</button>
            </a>
          </div>
        </div>
      </div>


      <!-- Фильмы справа -->
      <div class="col-md-9">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col" v-for="film in filteredFilms" :key="film.id">
            <div class="card h-100">
              <img :src="film.link_img" class="card-img-top" alt="..." width="70" height="450">
              <div class="card-body">
                <h5 class="card-title d-flex align-items-center" style="color: #8A13FC;">
                  {{ film.name }}
                  <span class="text-dark ms-2 fs-6">({{ film.year_of_issue }})</span>
                </h5>
                <p class="card-text">{{ film.duration }} мин.</p>
                <p class="card-text" v-if="film.categories.length != 0">Жанры: <template
                    v-for="(genre, index) in film.categories" :key="genre.id">
                    {{ (index != film.categories.length - 1) ? genre.name + ', ' : genre.name }}
                  </template></p>
                <p class="card-text" v-else>Нет жанров</p>
                <p class="card-text">Рейтинг: {{ film.ratingAvg }}</p>
              </div>
              <div class="card-footer text-center">
                <small class="text-body-secondary">
                  <a class="text-decoration-none">
                    <button class="btn reset">Смотреть</button>
                  </a>
                  <a class="text-decoration-none">
                    <button class="btn bg-dark" style="color: white;">О фильме</button>
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
  display: inline-block; /* Позволяет контейнеру занимать только необходимое пространство */
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
</style>