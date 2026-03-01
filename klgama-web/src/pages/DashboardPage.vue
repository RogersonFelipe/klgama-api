<template>
  <q-page class="q-pa-md">
    <h1>Dashboard</h1>
    <p>Bem-vindo, {{ authStore.user?.nome }}!</p>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Clientes</div>
            <div class="text-h3 text-primary">{{ clientes.length }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="primary" label="Ver" @click="$router.push('/clientes')" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Usuários</div>
            <div class="text-h3 text-primary">{{ usuarios.length }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="primary" label="Ver" @click="$router.push('/usuarios')" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Demandas</div>
            <div class="text-h3 text-primary">{{ demandas.length }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="primary" label="Ver" @click="$router.push('/demandas')" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import client from '../api/client'

const authStore = useAuthStore()
const clientes = ref([])
const usuarios = ref([])
const demandas = ref([])

onMounted(async () => {
  try {
    const [clientesRes, usuariosRes, demandasRes] = await Promise.all([
      client.get('/clientes'),
      client.get('/usuarios'),
      client.get('/demandas'),
    ])

    clientes.value = clientesRes.data.data || []
    usuarios.value = usuariosRes.data.data || []
    demandas.value = demandasRes.data.data || []
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
})
</script>
