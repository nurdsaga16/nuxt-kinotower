<template>
  <div class="form-container signin">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="signin">
        <h1 class="h3 my-3 fw-normal">Войти в систему</h1>
        <div class="alert alert-danger" role="alert" v-show="errorMessage">
          {{ errorMessage }}
        </div>
        <div class="form-floating mb-3">
          <input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Почта</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Пароль</label>
        </div>
        <button class="btn signin w-100 py-2" type="submit">Войти</button>
        <p class="mt-4 text-body-secondary">© 2017–2024</p>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
  const storedAuth = useAuthStore();
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');

  const signin = async () => {
    if(email.value && password.value) {
      try {
        await storedAuth.signin(email.value, password.value);
        router.push('/');
      } catch(error:any) {
        errorMessage.value = error.message;
      }
      
    }
  }


</script>

<style>
.form-container.signin {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 10px;
  max-width: 340px;
  margin: auto;
  transition: box-shadow 0.3s ease;
  margin-top: 100px;
}

.form-container.signin:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.form-signin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45vh;
}

.form-signin form {
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

.btn.signin {
  background-color: #8A13FC;
  color: white;
}

.btn.signin:hover {
  background-color: rgba(94, 1, 181, 0.8);
}
</style>