<script lang="ts" setup>
const storedProfile = useProfileStore();
const storedFilms = useFilmsStore();

const extractFirstName = (fullName: string): string => {
  const parts = fullName.split(" ");
  return parts.length > 1 ? parts[1] : "";
}
</script>

<template>
  <template v-if="storedProfile.userData">
    <div class="row mt-3">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;"
              v-if="storedProfile.userData.gender.name == 'Мужской'">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1.webp" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;" v-else>
            <h5 class="my-3">{{ extractFirstName(storedProfile.userData.fio) }}</h5>
            <p class="text-muted mb-4">Пользователь</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn change">Изменить</button>
              <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn delete ms-2"
                @click="storedProfile.removeUserData(), $router.push('/')">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">ФИО</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedProfile.userData.fio }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">Почта</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedProfile.userData.email }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">Дата рождения</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedProfile.userData.birthday }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">Пол</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedProfile.userData.gender.name }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">Кол-во отзывов</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedProfile.userData.reviewCount }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">Кол-во рейтингов</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedProfile.userData.ratingCount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="nav nav-underline" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link profile active" id="review-tab" href="#" data-bs-toggle="tab"
          data-bs-target="#review-tab-pane" role="tab" aria-selected="true">Отзывы</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link profile" id="rating-tab" href="#" data-bs-toggle="tab" data-bs-target="#rating-tab-pane"
          role="tab" aria-selected="false">Рейтинги</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade active" id="review-tab-pane" role="tabpanel" aria-labelledby="review-tab" tabindex="0">
        <div v-for="review in storedProfile.reviewsData" :key="review.id" class="review-item">
          <div class="row mb-3">
            <div class="col-lg-2 col-md-3 col-sm-4 col-12">
              <div class="poster">
                  <img :src="review.film.link_img" :alt="review.film.id">
              </div>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-6 col-12">
              <div class="row">
                <div class="col-12">
                  <h5>{{ review.film.name }}</h5>
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-12">
                  <div class="col-2">
                    <div class="isApproved"
                      :class="{ 'approve-success': review.is_approved, 'approve-danger': !review.is_approved }">
                      {{ (review.is_approved) ? 'Одобрено' : 'Не одобрено' }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-12" style="font-style: italic;">{{ new Date(review.created_at).toLocaleString() }}</div>
              </div>
              <div class="row">
                <div class="col-12">"{{ review.message }}"</div>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-12">
              <button class="btn delete mt-2" @click="storedProfile.removeReviewsData(review.id)">Удалить</button>
            </div>
          </div>
          <hr class="divider">
        </div>
      </div>
      <div class="tab-pane fade" id="rating-tab-pane" role="tabpanel" aria-labelledby="rating-tab" tabindex="0">
        <div v-for="rating in storedProfile.ratingsData" :key="rating.id" class="rating-item">
          <div class="row mb-3">
            <div class="col-lg-2 col-md-3 col-sm-4 col-12">
              <div class="poster">
                <img :src="rating.film.link_img" :alt="rating.film.id">
              </div>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-6 col-12">
              <div class="row">
                <div class="col-12">
                  <h5>{{ rating.film.name }}</h5>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-12" style="font-style: italic;">{{ new Date(rating.created_at).toLocaleString() }}</div>
              </div>
              <div class="col-12 fw-bold fs-5" style="color: #8A13FC;">
                <template v-for="i in rating.score">
                  ★
                </template>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-12">
              <div class="row">
                <div class="col-12">
                  <button class="btn delete mt-2"
                    @click="storedProfile.removeRatingsData(rating.id)">Удалить</button>
                </div>
              </div>
            </div>
          </div>
          <hr class="divider">
        </div>
      </div>
    </div>
  </template>
  <div class="d-flex justify-content-center" v-else>
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style>
.pre-text {
  color: #8A13FC;
}

.btn.change {
  background-color: #8A13FC;
  color: white;
}

.btn.change:hover {
  background-color: rgba(94, 1, 181, 0.8);
}

.btn.delete {
  color: #8A13FC;
  border-color: #8A13FC;
}

.btn.delete:hover {
  background-color: #8A13FC;
  color: #fff;
}

.nav.nav-underline {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.nav-item {
  flex: 1;
}

.nav-link.profile.active {
  background-color: #8A13FC;
  text-align: center;
  border-radius: 10px;
  color: #fff;
}

.nav-link.profile {
  color: #8A13FC;
}

.rating-item {
  padding: 20px 0;
}

.poster {
  width: 100%;
  height: auto;
}

@media (max-width: 576px) {
  .poster {
    margin-bottom: 10px;
  }
}

.review-item {
  padding: 20px 0;
}

.poster img {
  width: 100%;
  height: auto;
}

@media (max-width: 576px) {
  .poster {
    margin-bottom: 10px;
  }
}

.isApproved {
  color: white;
}

.isApproved.approve-success {
  display: inline-block;
  background-color: rgb(7, 179, 7);
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  text-align: center;
}

.isApproved.approve-danger {
  display: inline-block;
  background-color: red;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  text-align: center;
}
</style>