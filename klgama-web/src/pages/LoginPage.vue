<template>
  <div class="login-container">
    <q-card class="login-card">
      <q-card-section class="text-center q-pa-lg">
        <h1>KL Gama</h1>
        <p class="text-subtitle1">Sistema de Demandas</p>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg">
        <q-form @submit="handleLogin">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            class="q-mb-md"
            :rules="[val => val && val.length > 0 || 'Email obrigatório']"
          />

          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            outlined
            class="q-mb-lg"
            :rules="[val => val && val.length > 0 || 'Senha obrigatória']"
          />

          <q-btn
            type="submit"
            color="primary"
            label="Entrar"
            size="lg"
            full-width
            :loading="authStore.loading"
          />
        </q-form>

        <div v-if="authStore.error" class="q-mt-md text-negative">
          {{ authStore.error }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('admin@techsolutions.com');
const senha = ref('senha123');

const handleLogin = async () => {
  const success = await authStore.login(email.value, senha.value);
  if (success) {
    router.push('/dashboard');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
}
</style>