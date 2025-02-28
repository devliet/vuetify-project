<template>
    <RouterView />
   <aside>
       
        <div class="user">
            <h2>User >{{ userId }}</h2>
            <h2><router-link :to="{ name: 'user-profile', params: { userId } }">Profile</router-link></h2>
            <h2><router-link :to="{ name: 'user-posts', params: { userId } }">Posts</router-link></h2>
            <!-- <a href="#main-content">Skip to main content</a> -->
            <a @click="navigateToUserProfile"  href="#main-content">user-profile</a>
        </div>
   
    </aside>
    <main id="main-content">
        <div ref="infosUser" >
            <div>Infos</div>
        </div>
    </main>

</template>
<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userId = route.params.userId


const router = useRouter()
const navigateToUserProfile = () => {
  router.push({
    name: "user-profile",
    params: {
      userId: route.params.userId +1
    }
  });
}
</script>
<style></style>