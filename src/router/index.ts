import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UpdatePassword from '@/views/UpdatePassword.vue'
import Main from '@/views/Main.vue'
import UpdateUserInfo from '@/components/UpdateUserInfo.vue'
import BookingManage from '@/components/BookingManage.vue'
import MeetingRoomManage from '@/components/MeetingRoomManage.vue'
import UserManage from '@/components/UserManage.vue'
import Statistics from '@/components/Statistics.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: 'update_info',
          name: 'updateInfo',
          component: UpdateUserInfo
        },{
          path: 'booking_manage',
          name: 'bookingManage',
          component: BookingManage
        },{
          path: 'meeting_room_manage',
          name: 'meetingRoomManage',
          component: MeetingRoomManage
        },{
          path: 'user_manage',
          name: 'userManage',
          component: UserManage
        },{
          path: 'statistics',
          name: 'statictics',
          component: Statistics
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
