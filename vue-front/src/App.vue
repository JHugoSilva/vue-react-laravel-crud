<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

onMounted(()=> {
  authStore.getUser()
})
</script>

<template>
 <header>
  <nav>
    <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
    <div v-if="authStore.user" class="flex items-center space-x-6">
      <router-link :to="{ name: 'create' }" class="nav-link">New Post</router-link>
      <p class="text-sm text-slate-300">
        Welcome back {{ authStore.user.name }}
      </p>
      <form @submit.prevent="authStore.logout">
        <button class="nav-link">Logout</button>
      </form>
    </div>
    <div v-else class="space-x-6">
      <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
      <router-link :to="{ name:'login' }" class="nav-link">Login</router-link>
    </div>
  </nav>
 </header>
 <router-view></router-view>
</template>

<style scoped>

</style>
