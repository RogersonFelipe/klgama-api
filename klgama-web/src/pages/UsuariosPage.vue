<template>
  <q-page class="q-pa-md">
    <h1>Usuários</h1>

    <q-linear-progress v-if="loading" indeterminate color="primary" />

    <q-table v-if="!loading" :rows="usuarios" :columns="columns" row-key="id" class="q-mt-md">
      <template v-slot:body-cell-is_adm="props">
        <q-td :props="props">
          <q-badge :color="props.row.is_adm ? 'blue' : 'grey'">
            {{ props.row.is_adm ? 'Admin' : 'Usuário' }}
          </q-badge>
        </q-td>
      </template>
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

const usuarios = ref([])
const loading = ref(true)

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'is_adm', label: 'Tipo', field: 'is_adm', align: 'left' },
  { name: 'ativo', label: 'Status', field: 'ativo', align: 'left' },
]

onMounted(async () => {
  try {
    const response = await client.get('/usuarios')
    usuarios.value = response.data.data || []
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  } finally {
    loading.value = false
  }
})
</script>
