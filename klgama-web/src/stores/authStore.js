import { defineStore } from 'pinia';
import { ref } from 'vue';
import client from '../api/client';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const loading = ref(false);
  const error = ref(null);

  const login = async (email, senha) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await client.post('/auth/login', { email, senha });
      token.value = response.data.data.token;
      user.value = response.data.data.usuario;
      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao fazer login';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!token.value;

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  };
});