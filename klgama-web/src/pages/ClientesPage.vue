<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <h1 class="q-my-none">Clientes</h1>
      <q-btn v-if="authStore.user?.is_adm" label="Novo Cliente" color="primary" icon="add" @click="modalAberto = true" />
    </div>

    <q-linear-progress v-if="loading" indeterminate color="primary" />

    <q-table v-if="!loading" :rows="clientes" :columns="columns" row-key="id" class="q-mt-md">
      <template v-slot:body-cell-ativo="props">
        <q-td :props="props">
          <q-badge :color="props.row.ativo ? 'green' : 'red'">
            {{ props.row.ativo ? 'Ativo' : 'Inativo' }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-created_at="props">
        <q-td :props="props">
          {{ formatarDataHora(props.row.created_at) }}
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalAberto" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Novo Cliente</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.nome" label="Nome" outlined autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" @click="fecharModal" />
          <q-btn label="Salvar" color="primary" :loading="salvando" @click="criarCliente" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import client from '../api/client'
import { useAuthStore } from '../stores/authStore'

const $q = useQuasar()
const authStore = useAuthStore()

const clientes = ref([])
const loading = ref(true)
const modalAberto = ref(false)
const salvando = ref(false)

const form = ref({ nome: '' })

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'ativo', label: 'Status', field: 'ativo', align: 'left' },
  { name: 'created_at', label: 'Criado em', field: 'created_at', align: 'left' },
]

const formatarDataHora = (data) => {
  return new Date(data).toLocaleString('pt-BR')
}

const fecharModal = () => {
  modalAberto.value = false
  form.value = { nome: '' }
}

const criarCliente = async () => {
  if (!form.value.nome) {
    $q.notify({ type: 'warning', message: 'Informe o nome do cliente.' })
    return
  }

  salvando.value = true
  try {
    await client.post('/clientes', { nome: form.value.nome })
    $q.notify({ type: 'positive', message: 'Cliente criado com sucesso!' })
    fecharModal()
    await carregarClientes()
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao criar cliente.' })
  } finally {
    salvando.value = false
  }
}

const carregarClientes = async () => {
  loading.value = true
  try {
    const response = await client.get('/clientes')
    clientes.value = response.data.data || []
  } catch (erro) {
    console.error('Erro ao carregar clientes:', erro)
  } finally {
    loading.value = false
  }
}

onMounted(carregarClientes)
</script>
