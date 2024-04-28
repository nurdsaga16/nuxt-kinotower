<script lang="ts" setup>
const storedProfile = useProfileStore();
const storedGenders = useGendersStore();
const storedAuth = useAuthStore();
const storedFavorites = useFavoritesStore();
const router = useRouter();

const fio = ref('');
const email = ref('');
const birthday = ref('');
const gender = ref(0);
const errorMessage = ref(null);

const profileLoading = async () => {
  await storedProfile.fetchUserData(storedAuth.authData.id);
  fio.value = storedProfile.userData.fio;
  email.value = storedProfile.userData.email;
  birthday.value = storedProfile.userData.birthday;
  gender.value = storedProfile.userData.gender.id;
}

profileLoading();

const editProfile = async () => {
  if (fio.value && email.value && birthday.value && gender.value) {
    try {
      await storedProfile.updateProfile(fio.value, email.value, birthday.value, gender.value);
      profileLoading();
      const myModalAlternative = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModalAlternative.hide()

    } catch (error: any) {
      errorMessage.value = error.message;
    }
  }
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
            <h5 class="my-3">{{ storedProfile.userData.fio }}</h5>
            <p class="text-muted mb-4">Пользователь</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn change" data-bs-toggle="modal"
                data-bs-target="#exampleModal" data-bs-whatever="@mdo">Изменить</button>
              <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Изменение профиля</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="alert alert-danger" role="alert" v-show="errorMessage">
                          {{ errorMessage }}
                        </div>
                        <div class="mb-3 text-start">
                          <label for="Fio" class="mb-1">ФИО</label>
                          <input type="text" v-model="fio" class="form-control" id="Fio" placeholder="Fio">
                        </div>
                        <div class="mb-3 text-start">
                          <label for="Email" class="mb-1">Почта</label>
                          <input type="email" v-model="email" class="form-control" id="Email" placeholder="Email">
                        </div>
                        <div class="mb-3 text-start">
                          <label for="Birthday" class="mb-1">День рождения</label>
                          <input type="date" v-model="birthday" class="form-control" id="Birthday"
                            placeholder="Birthday">
                        </div>
                        <div class="mb-3 text-start">
                          <label for="Gender" class="mb-1">Гендер</label>
                          <select class="form-select" id="Gender" v-model="gender">
                            <option :value="null">Выбрать гендер...</option>
                            <option v-for="gender in storedGenders.genders" :value="gender.id" :key="gender.id">{{
                              gender.name }}
                            </option>
                          </select>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn delete" data-bs-dismiss="modal">Закрыть</button>
                      <button type="button" class="btn change" @click="editProfile">Сохранить</button>
                    </div>
                  </div>
                </div>
              </div>
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
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="pre-text mb-0">Кол-во избранных</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ storedFavorites.favorites.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="nav nav-underline" id="myTab" role="tablist">
      <li class="nav-item mb-4" role="presentation">
        <a class="nav-link profile active" id="review-tab" href="#" data-bs-toggle="tab"
          data-bs-target="#review-tab-pane" role="tab" aria-selected="true">Отзывы</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link profile" id="rating-tab" href="#" data-bs-toggle="tab" data-bs-target="#rating-tab-pane"
          role="tab" aria-selected="false">Рейтинги</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link profile" id="favorite-tab" href="#" data-bs-toggle="tab" data-bs-target="#favorite-tab-pane"
          role="tab" aria-selected="false">Избранные</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade active" id="review-tab-pane" role="tabpanel" aria-labelledby="review-tab" tabindex="0">
        <div v-for="review in storedProfile.reviewsData" :key="review.id"
          class="review-item bg-light p-3 mb-3 rounded-5">
          <div class="row mb-3">
            <div class="col-lg-2 col-md-3 col-sm-4 col-12">
              <div class="poster" @click="$router.push('/films/' + review.film.id)">
                <img :src="review.film.link_img" :alt="review.film.id" class="img-fluid rounded-4">
              </div>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-6 col-12">
              <div class="row">
                <div class="col-12" @click="$router.push('/films/' + review.film.id)">
                  <h5>{{ review.film.name }}</h5>
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-12">
                  <div class="col-2">
                    <div class="isApproved approve-success" v-if="review.is_approved">Одобрено</div>
                    <div class="isApproved approve-danger" v-else>Не одобрено</div>
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
            <div class="col-lg-2 col-md-2 col-sm-2 col-12 text-end">
              <button class="btn delete mt-2" @click="storedProfile.removeReviewsData(review.id)">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="rating-tab-pane" role="tabpanel" aria-labelledby="rating-tab" tabindex="0">
        <div v-for="rating in storedProfile.ratingsData" :key="rating.id"
          class="rating-item bg-light p-3 mb-3 rounded-5">
          <div class="row mb-3">
            <div class="col-lg-2 col-md-3 col-sm-4 col-12">
              <div class="poster" @click="$router.push('/films/' + rating.film.id)">
                <img :src="rating.film.link_img" :alt="rating.film.id" class="img-fluid rounded-4">
              </div>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-6 col-12">
              <div class="row">
                <div class="col-12" @click="$router.push('/films/' + rating.film.id)">
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
            <div class="col-lg-2 col-md-2 col-sm-2 col-12 text-end">
                <div class="col-12">
                  <button class="btn delete mt-2" @click="storedProfile.removeRatingsData(rating.id)">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="favorite-tab-pane" role="tabpanel" aria-labelledby="rating-tab" tabindex="0">
        <div v-for="favorite in storedFavorites.favorites" :key="favorite.id"
          class="favorite-item bg-light p-3 mb-3 rounded-5">
          <div class="row mb-3">
            <div class="col-lg-2 col-md-3 col-sm-4 col-12">
              <div class="poster" @click="$router.push('/films/' + favorite.id)">
                <img :src="favorite.link_img" :alt="favorite.id" class="img-fluid rounded-4">
              </div>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-6 col-12">
              <div class="row">
                <div class="col-12" @click="$router.push('/films/' + favorite.id)">
                  <h5>{{ favorite.name }}</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-12 text-end">
                <div class="col-12">
                  <button class="btn delete mt-2" @click="storedFavorites.removeFavoritesData(favorite.id)">Убрать</button>
                </div>
              </div>
            </div>
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

.nav-link.profile.active:hover {
  color: white;
}

.nav-link.profile:hover {
  color: #8A13FC;
}

.rating-item {
  padding: 20px 0;
  border: 1px solid #8A13FC;
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
  border: 1px solid #8A13FC;
}

.review-item.border {
  border-color: #8A13FC;
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

.favorite-item {
  padding: 20px 0;
  border: 1px solid #8A13FC;
}
</style>