<template>
  <q-page class="q-pa-md">
    <h1>Clientes</h1>

    <q-linear-progress v-if="loading" indeterminate color="primary" />

    <q-table v-if="!loading" :rows="clientes" :columns="columns" row-key="id" class="q-mt-md">
      <template v-slot:body-cell-ativo="props">
        <q-td :props="props">
          <q-badge :color="props.row.ativo ? 'green' : 'red'">
            {{ props.row.ativo ? 'Ativo' : 'Inativo' }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import client from '../api/client'

const clientes = ref([])
const loading = ref(true)

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'ativo', label: 'Status', field: 'ativo', align: 'left' },
  { name: 'created_at', label: 'Criado em', field: 'created_at', align: 'left' },
]

onMounted(async () => {
  try {
    const response = await client.get('/clientes')
    clientes.value = response.data.data || []
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
  } finally {
    loading.value = false
  }
})
</script>
