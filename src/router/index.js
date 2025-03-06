import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserPostsView from '../views/UserPostsView.vue'
import UserView from '../views/UserView.vue'
import ContactUs from '../components/organisms/ContactUs.vue'

import Comp1 from '@/views/Comp1.vue'
import Comp2 from '@/views/Comp2.vue'
import Comp3 from '@/views/Comp3.vue'
import Comp4 from '@/views/Comp4.vue'
import Comp5 from '@/views/Comp5.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: "/user/:userId",
      name: "user",
      redirect: { name: "user-profile" },
      //  component: UserView,
      children: [
        {
          path: "profile",
          name: "user-profile",
          component: UserProfileView
        },
        {
          path: "posts",
          name: "user-posts",
          component: UserPostsView
        }
      ]
    },
    {
      path: '/privacy',
      name: 'privacy',
      alias: '/privacy-policy',
      component: PrivacyView
    },
    {
      path: '/contact',
      name: 'contact',
      alias: '/contact',
      component: ContactUs
    },

    {
      path: "/list2",
      name: "list2",
      redirect: { name: "user-profile" },
      //  component: UserView,
      children: [
        {
          path: 'comp1',
          name: 'comp1',
          component: Comp1
        },
        {
          path: 'comp2',
          name: 'comp2',
          component: Comp2
        },

      ]
    },

    {
      path: "/list3",
      name: "list3",
      redirect: { name: "user-profile" },
      children: [
        {
          path: 'comp3',
          name: 'comp3',
          component: Comp3
        },
        {
          path: 'comp4',
          name: 'comp4',
          component: Comp4
        },
        {
          path: 'comp5',
          name: 'comp5',
          component: Comp5
        },

      ]
    },
  ]
});

export default router
