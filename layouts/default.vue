<script setup lang="ts">
const storedAuth = useAuthStore();

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="/public/assets/logo-kinotower.png" @click="$router.push('/')" alt="Logo" width="200"
                    height="40" class="d-inline-block align-text-top">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
            </div>
            <div class="d-flex my-2">
                <template v-if="storedAuth.authData" class="d-flex align-items-center justify-content-center">
                    <div class="text-center">
                        <a href="#" @click.prevent="$router.push('/profile')" class="profile">{{ storedAuth.authData.fio }}</a>
                        <button @click="storedAuth.signout(), $router.push('/')" class="btn register ms-3">Выйти</button>
                    </div>
                </template>
                <template v-else>
                    <button @click="$router.push('/signin')" class="btn login">Войти</button>
                    <button @click="$router.push('/signup')" class="btn register">Зарегистрироваться</button>
                </template>
            </div>
        </div>
    </nav>
    <div class="container py-4 mb-auto">
        <slot />
    </div>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-dark text-light">
        <div class="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                style="margin-left: 20px;">
                <img src="/public/assets/logo-kinotower.png" width="100" height="20" lt="">
            </a>
            <span class="mb-3 mb-md-0">© 2024 KinoTOWER, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3"><a class="text-light" href="#"><svg class="bi" width="24" height="24">
                        <use xlink:href="#twitter"></use>
                    </svg></a></li>
            <li class="ms-3"><a class="text-light" href="#"><svg class="bi" width="24" height="24">
                        <use xlink:href="#instagram"></use>
                    </svg></a></li>
            <li class="ms-3"><a class="text-light" href="#"><svg class="bi" width="24" height="24">
                        <use xlink:href="#facebook"></use>
                    </svg></a></li>
        </ul>
    </footer>
</template>

<style>
.navbar-brand {
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 5px;
}

.btn.login {
    color: white;
}

.profile {
    color: white;
    text-decoration: none;
}

.btn.register {
    background-color: #8A13FC;
    color: white;
}

.btn.register:hover {
    background-color: rgba(94, 1, 181, 0.8);
    /* Use rgba for opacity */
}

a {
    text-decoration: none;
    margin-left: 10px;
}

a:hover {
    text-decoration: none;
    color: white;
}

.container {
    min-height: calc(100vh - 138px);
}
</style>