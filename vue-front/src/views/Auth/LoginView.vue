<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from '../../stores/auth'
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore()

const formData = reactive({
    email: 'em@email.com',
    password: '123456'
})

onMounted(()=>{
    (errors.value = {})
})

</script>

<template>
    <main>
        <h1 class="title">Login a account</h1>
        <form class="w-1/2 mx-auto space-y-6" @submit.prevent="authenticate('auth/login', formData)">
            <div>
                <input type="email" v-model="formData.email" placeholder="Email">
                <p class="error" v-if="errors.email">{{ errors.email[0] }}</p>
            </div>
            <div>
                <input type="password" v-model="formData.password" placeholder="Password">
                <p class="error" v-if="errors.password">{{ errors.password[0] }}</p>
            </div>
            <div>
                <button class="primary-btn">Login</button>
            </div>
        </form>
    </main>
</template>