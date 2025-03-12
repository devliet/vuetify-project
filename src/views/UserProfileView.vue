<template>
    <section class="userView">
        
        <h2>User information</h2>
        <template v-for="key in valuesToDisplay">
            <label v-if="user[key]">
                {{ key }}
                <input type="text" disabled :value="user[key]" /><br/>
            </label>
        </template>
    </section>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
const user = reactive({});
const props = defineProps({
    userId: String
})
const valuesToDisplay = [
    "title",
    "first",
    "last",
    "email",
    "picture",
    "gender"

];
const fetchUser = (userId) => {
    const baseUrl = "https://dummyjson.com/";
    
    fetch(`${baseUrl}users/${route.params.userId}`, {
        // "headers": {
        //     "app-id": "657a3106698992f50c0a5885"
        // }
    })
        .then(response => response.json())
        .then(result => {
         //   Object.assign(user, result);
         
            user.title= result.company.title,
            user.first=result.firstName,
            user.last= result.lastName,
            user.email= result.email,
            user.picture= result.image,
      //   comments="fields3[index].body,
            user.gender= result.gender
        });
} 
const route = useRoute();

console.log(JSON.stringify(route) + "zz")
fetchUser(route.params.userId + 1);
</script>
<style>
input
{
    width: 400px
}
</style>