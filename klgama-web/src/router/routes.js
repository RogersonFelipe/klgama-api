const routes = [
  {
    path: '/',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'clientes',
        component: () => import('pages/ClientesPage.vue'),
      },
      {
        path: 'usuarios',
        component: () => import('pages/UsuariosPage.vue'),
      },
      {
        path: 'demandas',
        component: () => import('pages/DemandasPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
