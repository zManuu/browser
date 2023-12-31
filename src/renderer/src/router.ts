import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
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
      component: () => import('./views/test/TestView.vue'),
      children: [
        {
          path: 'contextmenu/file',
          component: () => import('./views/test/ContextMenuFileTestView.vue')
        },
        {
          path: 'contextmenu/directory',
          component: () => import('./views/test/ContextMenuDirectoryTestView.vue')
        },
        {
          path: 'preview/file',
          component: () => import('./views/test/PreviewFileTestView.vue')
        },
        {
          path: 'preview/directory',
          component: () => import('./views/test/PreviewDirectoryTestView.vue')
        },
        {
          path: 'confirm',
          component: () => import('./views/test/ConfirmTestView.vue')
        },
        {
          path: 'terminal',
          component: () => import('./views/test/TerminalTestView.vue')
        }
      ]
    }
  ]
})
