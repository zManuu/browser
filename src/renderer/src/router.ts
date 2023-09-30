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
      path: '/test',
      component: () => import('./views/TestView.vue'),
      children: [
        {
          path: 'contextmenu/file',
          component: () => import('./views/ContextMenuFileTestView.vue')
        },
        {
          path: 'contextmenu/directory',
          component: () => import('./views/ContextMenuDirectoryTestView.vue')
        }
      ]
    }
  ]
})
