<template>
  <q-page class="q-pa-md">
    <h1>Demandas</h1>

    <q-linear-progress v-if="loading" indeterminate color="primary" />

    <q-table v-if="!loading" :rows="demandas" :columns="columns" row-key="id" class="q-mt-md">
      <template v-slot:body-cell-due_date="props">
        <q-td :props="props">
          {{ formatarData(props.row.due_date) }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import client from '../api/client'

const demandas = ref([])
const loading = ref(true)

const columns = [
  { name: 'descr', label: 'Descrição', field: 'descr', align: 'left' },
  { name: 'due_date', label: 'Data Vencimento', field: 'due_date', align: 'left' },
  { name: 'created_at', label: 'Criado em', field: 'created_at', align: 'left' },
]

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR')
}

onMounted(async () => {
  try {
    const response = await client.get('/demandas')
    demandas.value = response.data.data || []
  } catch (error) {
    console.error('Erro ao carregar demandas:', error)
  } finally {
    loading.value = false
  }
})
</script>
