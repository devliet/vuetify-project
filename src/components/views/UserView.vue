<template>
    <RouterView/>
<div class="user">
        <h2>User >{{ $route.params.userId }}</h2>
        <h2><router-link :to="{name: 'user-profile', params: {userId} }">Profile</router-link></h2>
        <h2><router-link :to="{name: 'user-posts', params: {userId} }">Posts</router-link></h2>
     </div>
</template>
<script setup>
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
const userId = route.params.userId


</script>
<style>
</style>


   