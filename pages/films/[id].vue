<script lang="ts" setup>
const storedDetailFilm = useDetailFilmStore();
const storedProfile = useProfileStore();
const storedAuth = useAuthStore();
const storedActors = useActorsStore();
const route = useRoute();
const message = ref('');
const hoverRating = ref(0);

storedDetailFilm.fetchFilm(route.params.id);
storedDetailFilm.fetchReviews(route.params.id);
storedDetailFilm.fetchRatings(route.params.id);
storedActors.fetchActors(route.params.id);
storedProfile.fetchLikes(route.params.id);

const sendReview = () => {
  if (message.value) {
    storedDetailFilm.addReview(route.params.id, message.value);
  }
}

const likes = ref(storedProfile.likes);
const dislikes = ref(storedProfile.dislikes);

const toggleLike = async (filmId, reviewId) => {
  if (likes.value[reviewId]) {
    likes.value[reviewId] = false;
    await storedProfile.removeLike(filmId, reviewId);
  } else {
    likes.value[reviewId] = true;
    dislikes.value[reviewId] = false;
    await storedProfile.addLike(filmId, reviewId);
  }
};

const toggleDislike = async (filmId, reviewId) => {
  if (dislikes.value[reviewId]) {
    dislikes.value[reviewId] = false;
    await storedProfile.removeLike(filmId, reviewId);
  } else {
    dislikes.value[reviewId] = true;
    likes.value[reviewId] = false;
    await storedProfile.addDislike(filmId, reviewId);
  }
}

</script>

<template>
  <template v-if="storedDetailFilm.film">
    <div class="d-flex row mt-5">
      <div class="col-md-4">
        <img :src="storedDetailFilm.film.link_img" alt="Film"
          style="min-height:500px; max-height: 500px; border-radius: 15px; ">
      </div>
      <div class="card-body col-md-8">
        <div class="m-4">
          <div class="d-flex align-items-center justify-content-baseline fw-bold film-name" style="font-size: 3rem">
            <h1 class="d-flex-grow fw-bold me-5" style="font-size: 50px;">{{ storedDetailFilm.film.name }}</h1>
            <div class="d-flex align-items-baseline mt-3">
              <p
                style="background: linear-gradient(to right, #FFD700, #d08801); -webkit-background-clip: text; color: transparent; font-size: 40px;">
                {{ storedDetailFilm.film.ratingAvg }}</p>
              <i class="fas fa-regular fa-star mx-3"
                style="background: linear-gradient(to right, #FFD700, #efa620); -webkit-background-clip: text; color: transparent; font-size: 40px;"></i>
            </div>
          </div>
          <p class="font-weight-bold mt-5" style="font-size: 1.5rem;">О фильме</p>
          <div style="line-height: 30px">
            <div class="row mt-3" style="width: 800px">
              <div class="col-sm-6">
                <table class="table table-borderless">
                  <tr>
                    <td class="text-left border-bottom">Страна:</td>
                    <td class="text-right border-bottom">{{ storedDetailFilm.film.country.name }}</td>
                  </tr>
                  <tr>
                    <td class="text-left border-bottom">Продолжительность:</td>
                    <td class="text-right border-bottom">{{ storedDetailFilm.film.duration }} мин.</td>
                  </tr>
                  <tr>
                    <td class="text-left border-bottom">Дата выхода:</td>
                    <td class="text-right border-bottom">{{ storedDetailFilm.film.year_of_issue }}</td>
                  </tr>
                  <tr>
                    <td class="text-left border-bottom">Возраст:</td>
                    <td class="text-right border-bottom">{{ storedDetailFilm.film.age }}+</td>
                  </tr>
                  <tr class="my-3">
                    <td class="text-left border-bottom">Категории:</td>
                    <td class="text-right border-bottom" v-if="storedDetailFilm.film.categories.length != 0">
                      <template v-for="(genre, index) in storedDetailFilm.film.categories" :key="genre.id">
                        {{ (index != storedDetailFilm.film.categories.length - 1) ? genre.name + ', ' : genre.name }}
                      </template>
                    </td>
                    <p class="text-muted" v-else>Нет жанров</p>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <p class="player text-start fw-semibold fs-3">Актеры</p>
      <div class="d-flex flex-row">
        <div class="card actor me-3" style="width: 18rem;" v-for="actor in storedActors.actors" :key="actor.id">
          <img :src="actor.link_img" class="card-img-top" alt="Портрет актера">
          <div class="card-body">
            <h5 class="card-title">{{ actor.fio }}</h5>
          </div>
        </div>
        <!-- Добавьте больше карточек по мере необходимости -->
      </div>
    </div>
    <div class="mt-5">
      <p class="player text-start fw-semibold fs-3">Плеер</p>
      <div class="d-flex justify-content-center align-items-center">
        <iframe width="1300" height="765" :src="`https://www.youtube.com/embed/${storedDetailFilm.film.link_video}`"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
    <!-- <div v-if="storedProfile.ratingsData.value.film.id == storedDetailFilm.film.id">
      <p class="mt-5 fw-bold" style="font-size: 1.5rem;">Спасибо за рейтинг!</p>
      <div class="stars-container mt-2">
        <p v-for="index in storedProfile.ratingsData.value.score" :key="index">
          <i class="fas fa-star text-warning fa-2x"></i>
        </p>
      </div>
    </div> -->
    <div v-if="storedAuth.authData">
      <div class="ratings">
        <p class="mt-5 fw-bold" style="font-size: 1.5rem; color: #8A13FC;">Оставьте рейтинг</p>
        <div class="stars-container mt-2">
          <p v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="index">
            <a @click.prevent="storedDetailFilm.addRating(index)"
              class="text-warning link-offset-2 link-underline link-underline-opacity-0">
              <i :class="['fas', 'fa-star', 'fa-2x', { 'active': hoverRating >= index }]"
                @mouseover="hoverRating = index"></i>
            </a>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="review" class="form-label">
            <p class="mt-5 fw-bold" style="font-size: 1.5rem; color: #8A13FC;">Оставьте отзыв</p>
          </label>
          <div contenteditable>
            <textarea class="form-control" rows="4" v-model="message" placeholder="Отзыв..."></textarea>
          </div>
        </div>
        <div class="col-md-2 d-flex align-items-end justify-content-start">
          <button class="btn send" @click="sendReview"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
    <div class="row mt-5" v-else>
      <p class="text-center">
        Пожалуйста <span @click="$router.push('/signin')" style="color: #8A13FC;">зайдите в аккаунт</span> или <span
          @click="$router.push('/signup')" style="color: #8A13FC;">регистрируйтесь</span>, для того чтобы оставить отзыв
      </p>
    </div>
    <div class="row mt-3">
      <div class="col">
        <p class="fw-semibold mt-5" style="font-size: 2rem; color: #8A13FC;">Отзывы</p>
      </div>
      <div class="row">
        <div class="col-md-12" v-for="review in storedDetailFilm.reviews" :key="review.id">
          <div class="card mb-4 card-review">
            <div class="card-body">
              <h5 class="card-title">{{ review.user.fio }}</h5>
              <h6 class="card-subtitle mb-2" style="color: #8A13FC;">{{ (new
                Date(review.created_at)).toLocaleDateString()
                }}</h6>
              <div class="d-flex justify-content-between">
                <p class="card-text">{{ review.message }}</p>

                <div class="like">
                  <i :class="likes[review.id] ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'" class="fa-lg me-3"
                    @click="() => toggleLike(storedDetailFilm.film.id, review.id)"></i>
                  <i :class="dislikes[review.id] ? 'fa-solid fa-thumbs-down' : 'fa-regular fa-thumbs-down'"
                    class="fa-lg me-3" @click="() => toggleDislike(storedDetailFilm.film.id, review.id)"></i>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style>
.text-left {
  color: #8A13FC;
}

.player {
  display: inline-block;
  background-color: #8A13FC;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  justify-content: start;
  padding: 5px 10px;
}

iframe {
  border-radius: 10px;
}

.stars-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.fa-star {
  color: #ccc;
}

.fa-star.active,
.fa-star:hover {
  color: #f1c40f;
}

.fa-star.active~.fa-star {
  color: #f1c40f;
}

.btn.send {
  background-color: #8A13FC;
  color: white;
}

.btn.send:hover {
  background-color: rgba(94, 1, 181, 0.8);
}

.card-review {
  border: 1px solid #8A13FC;
}

textarea {
  width: 100%;
  resize: none;
}

.card.actor {
  border-radius: 15px;
  border: 1px solid #8A13FC;
  color: #8A13FC;
}

.card.actor img {
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.fa-thumbs-up {
  color: #8A13FC;
}

.fa-thumbs-down {
  color: #8A13FC;
}
</style>