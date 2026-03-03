<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <h1 class="q-my-none">Demandas</h1>
      <q-btn label="Nova Demanda" color="primary" icon="add" @click="modalAberto = true" />
    </div>

    <q-linear-progress v-if="loading" indeterminate color="primary" />

    <q-table v-if="!loading" :rows="demandas" :columns="columns" row-key="id" class="q-mt-md">
      <template v-slot:body-cell-due_date="props">
        <q-td :props="props">
          {{ formatarData(props.row.due_date) }}
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
          <div class="text-h6">Nova Demanda</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="form.descr"
            label="Descrição"
            outlined
            autofocus
          />
          <q-input
            v-model="form.due_date"
            label="Data de Vencimento"
            outlined
            type="date"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" @click="fecharModal" />
          <q-btn label="Salvar" color="primary" :loading="salvando" @click="criarDemanda" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import client from '../api/client'
const $q = useQuasar()

const demandas = ref([])
const loading = ref(true)
const modalAberto = ref(false)
const salvando = ref(false)

const form = ref({ descr: '', due_date: '' })

const columns = [
  { name: 'descr', label: 'Descrição', field: 'descr', align: 'left' },
  { name: 'due_date', label: 'Data Vencimento', field: 'due_date', align: 'left' },
  { name: 'created_at', label: 'Criado em', field: 'created_at', align: 'left' },
]

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR')
}

const formatarDataHora = (data) => {
  return new Date(data).toLocaleString('pt-BR')
}

const fecharModal = () => {
  modalAberto.value = false
  form.value = { descr: '', due_date: '' }
}

const criarDemanda = async () => {
  if (!form.value.descr || !form.value.due_date) {
    $q.notify({ type: 'warning', message: 'Preencha todos os campos.' })
    return
  }

  salvando.value = true
  try {
    await client.post('/demandas', {
      descr: form.value.descr,
      due_date: form.value.due_date,
    })
    $q.notify({ type: 'positive', message: 'Demanda criada com sucesso!' })
    fecharModal()
    await carregarDemandas()
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao criar demanda.' })
  } finally {
    salvando.value = false
  }
}

const carregarDemandas = async () => {
  loading.value = true
  try {
    const response = await client.get('/demandas')
    demandas.value = response.data.data || []
  } catch (erro) {
    console.error('Erro ao carregar demandas:', erro)
  } finally {
    loading.value = false
  }
}

onMounted(carregarDemandas)
</script>
