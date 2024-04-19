<script lang="ts" setup>
  const storedFilms = useFilmsStore();

  storedFilms.fetchFilms();
</script>

<template>
  <div class="row my-4">
    <div class="col-md-4">
      <select class="form-select" aria-label="Default select example">
        <option selected disabled>Select genre...</option>
        <option value="1">Боевик</option>
        <option value="2">Драма</option>
        <option value="3">Комедия</option>
      </select>
    </div>
    <div class="col-md-4">
      <select class="form-select" aria-label="Default select example">
        <option selected disabled>Select country...</option>
        <option value="1">USA</option>
        <option value="2">Great Britain</option>
        <option value="3">Kazakhstan</option>
      </select>
    </div>
    <div class="col-md-3">
      <select class="form-select" aria-label="Default select example">
        <option selected disabled>Sort by...</option>
        <option value="1">Name</option>
        <option value="2">Year</option>
        <option value="3">Rating</option>
      </select>
    </div>
    <div class="col-md-1">
      <a class="text-decoration-none">
        <button class="btn">Reset</button>
      </a>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="film in storedFilms.films" :key="film.id">
      <div class="card h-100">
        <img :src="film.link_img"
          class="card-img-top" alt="..." width="70" height="600">
        <div class="card-body">
          <h5 class="card-title">{{ film.name }}</h5>
          <p class="card-text">Рейтинг: {{ film.ratingAvg }}</p>
          <p class="card-text">Продолжительность: {{ film.duration }} мин.</p>
          <p class="card-text" v-if="film.categories.length != 0">Жанры: <template v-for="(genre, index) in film.categories" :key="genre.id">
            {{ (index != film.categories.length-1) ? genre.name+', ' : genre.name}}
          </template></p>
          <p class="card-text" v-else>Нет жанров</p>
        </div>
        <div class="card-footer text-center">
          <small class="text-body-secondary">
            <a class="text-decoration-none">
              <button class="btn">Смотреть</button>
            </a>
          </small>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination list films -->

  <nav aria-label="Page navigation example" class="my-4 d-flex justify-content-center">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>

</template>

<script lang="ts" setup>

</script>

<style></style>