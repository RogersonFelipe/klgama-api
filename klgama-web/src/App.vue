<template>
  <router-view v-if="authStore.isAuthenticated() || isLoginPage" />
  <div v-else class="text-center q-pa-md">
    <p>Redirecionando para login...</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()
const route = useRoute()

const isLoginPage = computed(() => route.path === '/')
</script>
