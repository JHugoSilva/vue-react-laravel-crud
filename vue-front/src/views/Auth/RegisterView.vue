<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from '../../stores/auth'
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore()

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

onMounted(()=>{
    (errors.value = {})
})

</script>

<template>
    <main>
        <h1 class="title">Register new a account</h1>
        <form class="w-1/2 mx-auto space-y-6" @submit.prevent="authenticate('auth/register', formData)">
            <div>
                <input type="text" v-model="formData.name" placeholder="Name">
                <p class="error" v-if="errors.name">{{ errors.name[0] }}</p>
            </div>
            <div>
                <input type="email" v-model="formData.email" placeholder="Email">
                <p class="error" v-if="errors.email">{{ errors.email[0] }}</p>
            </div>
            <div>
                <input type="password" v-model="formData.password" placeholder="Password">
                <p class="error" v-if="errors.password">{{ errors.password[0] }}</p>
            </div>
            <div>
                <input type="password" v-model="formData.password_confirmation" placeholder="Confirm Password">
            </div>
            <div>
                <button class="primary-btn">Register</button>
            </div>
        </form>
    </main>
</template>