import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/browse/:dir',
      component: () => import('./views/BrowserView.vue')
    },
    {
      path: '/test/contextmenu/file',
      component: () => import('./views/ContextMenuFileTestView.vue')
    },
    {
      path: '/test/contextmenu/directory',
      component: () => import('./views/ContextMenuDirectoryTestView.vue')
    }
  ]
})
