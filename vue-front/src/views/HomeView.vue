<script setup>
import { onMounted, ref } from 'vue';
import { userPostsStore } from '@/stores/posts';

const { getAllPosts } = userPostsStore()
const posts = ref([])

onMounted(async()=>{
  posts.value = await getAllPosts()
})
</script>

<template>
  <main>
   <h1 class="title">Latest Posts</h1>
   <div v-if="posts.length > 0">
    <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
      <h2 class="font-bold text-3xl">{{ post.title }}</h2>
      <p class="text-xs text-slate-600 mb-4">
        Posted by {{ post.user.name }}
      </p>
      <p>
        {{ post.body }}
        <router-link :to="{ name: 'show', params: { id: post.id }}" class="text-blue-500 font-bold underline">Read more ...</router-link>
      </p>
    </div>
   </div>
   <div v-else>
    <div  class="border-l-4 border-blue-500 pl-4 mb-12">
      Processing...
    </div>
   </div>
  </main>
</template>
