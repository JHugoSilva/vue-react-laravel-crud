<script setup>
import { useAuthStore } from '@/stores/auth';
import { userPostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { user } = storeToRefs(useAuthStore())
const { errors } = storeToRefs(userPostsStore())
const { getPost, updatePost } = userPostsStore()

const post = ref(null)
const route = useRoute()
const router = useRouter()
const formData = reactive({
    title: '',
    body: ''
})

onMounted(async()=> {
    post.value = await getPost(route.params.id)
    if (user.value.id !== post.value.user_id) {
        router.push({ name: 'home' })
    } else {
        formData.title = post.value.title
        formData.body = post.value.body        
    }
})
</script>

<template>
  <main>
    <h1 class="title">Update Post</h1>
    <form @submit.prevent="updatePost(post, formData)" class="w-1/2 mx-auto space-y-6">
        <div>
            <input type="text" v-model="formData.title" placeholder="Post title">
            <p class="error" v-if="errors.title">{{ errors.title[0] }}</p>
        </div>
        <div>
            <textarea rows="6" v-model="formData.body" placeholder="Post Content"></textarea>
            <p class="error" v-if="errors.body">{{ errors.body[0] }}</p>
        </div>
        <div>
            <button class="primary-btn">Update</button>
        </div>
    </form>
  </main>
</template>
