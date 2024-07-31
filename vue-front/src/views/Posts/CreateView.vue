<script setup>
import { userPostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(userPostsStore())
const { createPost } = userPostsStore()

const formData = reactive({
    title: '',
    body: ''
})

onMounted(()=> errors.value = {} )
</script>

<template>
  <main>
    <h1 class="title">New Post</h1>
    <form @submit.prevent="createPost(formData)" class="w-1/2 mx-auto space-y-6">
        <div>
            <input type="text" v-model="formData.title" placeholder="Post title">
            <p class="error" v-if="errors.title">{{ errors.title[0] }}</p>
        </div>
        <div>
            <textarea rows="6" v-model="formData.body" placeholder="Post Content"></textarea>
            <p class="error" v-if="errors.body">{{ errors.body[0] }}</p>
        </div>
        <div>
            <button class="primary-btn">Create</button>
        </div>
    </form>
  </main>
</template>
