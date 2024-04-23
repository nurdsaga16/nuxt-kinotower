<template>
  <div class="form-container signup">
    <main class="form-signup w-100 m-auto">
      <form @submit.prevent="signup">
        <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
        <div class="alert alert-danger" role="alert" v-show="errorMessage">
          {{ errorMessage }}
        </div>
        <div class="form-floating mb-3">
          <input type="text" v-model="fio" class="form-control" id="Fio" placeholder="Fio">
          <label for="Fio">ФИО</label>
        </div>
        <div class="form-floating mb-3">
          <input type="email" v-model="email" class="form-control" id="Email" placeholder="Email">
          <label for="Email">Почта</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" v-model="password" class="form-control" id="Password" placeholder="Password">
          <label for="Password">Пароль</label>
        </div>
        <div class="form-floating mb-3">
          <input type="date" v-model="birthday" class="form-control" id="Birthday" placeholder="Birthday">
          <label for="Birthday">День рождения</label>
        </div>
        <div class="form-floating mb-3">
          <select v-model="gender" class="form-select" id="Gender">
            <option :value="null">Выбрать гендер...</option>
            <option v-for="gender in storedGenders.genders" :value="gender.id" :key="gender.id">{{ gender.name }}
            </option>
          </select>
          <label for="Gender">Гендер</label>
        </div>
        <button class="btn signup w-100 py-2" type="submit">Зарегистрироваться</button>
        <p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
const storedAuth = useAuthStore();
const storedGenders = useGendersStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const fio = ref('');
const birthday = ref('');
const gender = ref(null);
const errorMessage = ref(null);

const signup = async () => {
  if (fio.value && email.value && password.value && birthday.value && gender.value) {
    try {
      await storedAuth.signup({
        fio: fio.value,
        email: email.value,
        password: password.value,
        birthday: birthday.value,
        gender_id: gender.value,
      });
      router.push('/');
    } catch (error: any) {
      errorMessage.value = error.message;
    }

  }
}
</script>

<style>
.form-container.signup {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 10px;
  max-width: 340px;
  margin: auto;
  transition: box-shadow 0.3s ease;
}

.form-container.signup:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.form-signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.form-signup form {
  width: 300px;
}

.form-floating {
  position: relative;
}

.form-floating input {
  height: 50px;
}

.h3 {
  text-align: center;
  color: #8A13FC;
}

.btn.signup {
  background-color: #8A13FC;
  color: white;
}

.btn.signup:hover {
  background-color: rgba(94, 1, 181, 0.8);
}
</style>