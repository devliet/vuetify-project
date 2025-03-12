import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserPostsView from '../views/UserPostsView.vue'
// import UserView from '../views/UserView.vue'
import ContactUs from '../components/organisms/ContactUs.vue'


import CreatePost from '../components/molecules/CreatePost.vue'
import UpdateTimeView from '../views/UpdateTimeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
//add a post for emilsys = 121
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
      path: '/manage',
      name: 'manage',
    //  component: HomeView,
      children: [
        {
          path: "posts-add",
          name: "posts-add",
          component: CreatePost
        },
      ]
    },
    {
      path: '/app',
      name: 'app',
      redirect: { name: "home" },

      children: [
        {
          path: 'privacy',
          name: 'appprivacy',
          component: PrivacyView
        },
        {
          path: 'contact',
          name: 'contact',
          alias: '/contact',
          component: ContactUs
        },
        {
          path: 'about',
          name: 'appabout',
          component: AboutView
        },
      ]
    },
    {
      path: '/misc',
      name: 'misc',
      redirect: { name: "home" },
      children: [
        {
          path: 'updatetime',
          name: 'updatetime',
          component: UpdateTimeView
        },
      ]
    },
  ]
});

export default router
