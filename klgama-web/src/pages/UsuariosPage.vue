<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <h1 class="q-my-none">Usuários</h1>
      <q-btn v-if="authStore.user?.is_adm" label="Novo Usuário" color="primary" icon="add" @click="modalAberto = true" />
    </div>

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

    <q-dialog v-model="modalAberto" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Novo Usuário</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.nome" label="Nome" outlined autofocus />
          <q-input v-model="form.email" label="Email" outlined type="email" />
          <q-input v-model="form.senha" label="Senha" outlined type="password" />
          <q-toggle v-model="form.is_adm" label="Administrador" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" @click="fecharModal" />
          <q-btn label="Salvar" color="primary" :loading="salvando" @click="criarUsuario" />
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

const usuarios = ref([])
const loading = ref(true)
const modalAberto = ref(false)
const salvando = ref(false)

const form = ref({ nome: '', email: '', senha: '', is_adm: false })

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'is_adm', label: 'Tipo', field: 'is_adm', align: 'left' },
  { name: 'ativo', label: 'Status', field: 'ativo', align: 'left' },
]

const fecharModal = () => {
  modalAberto.value = false
  form.value = { nome: '', email: '', senha: '', is_adm: false }
}

const criarUsuario = async () => {
  if (!form.value.nome || !form.value.email || !form.value.senha) {
    $q.notify({ type: 'warning', message: 'Preencha todos os campos.' })
    return
  }

  salvando.value = true
  try {
    await client.post('/usuarios', {
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      is_adm: form.value.is_adm,
      cliente_id: authStore.user.cliente_id,
    })
    $q.notify({ type: 'positive', message: 'Usuário criado com sucesso!' })
    fecharModal()
    await carregarUsuarios()
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao criar usuário.' })
  } finally {
    salvando.value = false
  }
}

const carregarUsuarios = async () => {
  loading.value = true
  try {
    const response = await client.get('/usuarios')
    usuarios.value = response.data.data || []
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro)
  } finally {
    loading.value = false
  }
}

onMounted(carregarUsuarios)
</script>
