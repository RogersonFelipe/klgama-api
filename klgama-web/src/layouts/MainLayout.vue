<template>
  <q-layout view="hHr lpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>KL Gama - Sistema de Demandas</q-toolbar-title>
        <div class="text-caption q-mr-md">{{ authStore.user?.nome }}</div>
        <q-btn flat round dense icon="logout" @click="handleLogout" title="Sair" />
      </q-toolbar>
    </q-header>

    <!-- Drawer Menu -->
    <q-drawer v-model="drawer" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <q-item
          clickable
          :active="$route.path === '/dashboard'"
          @click="$router.push('/dashboard')"
          active-class="bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item
          clickable
          :active="$route.path === '/dashboard/clientes'"
          @click="$router.push('/dashboard/clientes')"
          active-class="bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon name="business" />
          </q-item-section>
          <q-item-section>Clientes</q-item-section>
        </q-item>

        <q-item
          clickable
          :active="$route.path === '/dashboard/usuarios'"
          @click="$router.push('/dashboard/usuarios')"
          active-class="bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Usuários</q-item-section>
        </q-item>

        <q-item
          clickable
          :active="$route.path === '/dashboard/demandas'"
          @click="$router.push('/dashboard/demandas')"
          active-class="bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon name="task_alt" />
          </q-item-section>
          <q-item-section>Demandas</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const drawer = ref(true)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
