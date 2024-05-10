import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UpdatePassword from '@/views/UpdatePassword.vue'
import Main from '@/views/Main.vue'
import UpdateUserInfo from '@/components/UpdateUserInfo.vue'
import Test from '@/components/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          name: 'updateInfo',
          path: 'update_info',
          component: UpdateUserInfo
        },{
          name: 'bbb',
          path: 'bbb',
          component: Test
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/update_password',
      name: 'updatePassword',
      component: UpdatePassword
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/Error.vue')
    }
    // {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
