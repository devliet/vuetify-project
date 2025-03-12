<template>

  <v-app>
    <v-card>
      <v-row>
        <v-col>
          <v-app-bar color="primary" style="height: 67px;">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title @click="goHome">Companion App</v-toolbar-title>
            <!-- <v-app-bar-title>Photos</v-app-bar-title> -->
            <v-spacer></v-spacer>

            <template v-if="$vuetify.display.mdAndUp">
              <v-btn icon="mdi-magnify" variant="text"></v-btn>

              <v-btn icon="mdi-filter" variant="text"></v-btn>
            </template>

            <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
          </v-app-bar>

          <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'top' : 'top'" temporary
            style="width: 300px;">
                 
            <v-list>
              <v-list-group value="Posts">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="Posts"></v-list-item>
                </template>

                <v-list-item v-for="([title, icon, mypath], i) in menuDataPosts" :key="i" :prepend-icon="icon" :title="title"
                  :value="title" :to="mypath"></v-list-item>
              </v-list-group>
            </v-list>




            <v-list>
              <v-list-group value="App">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="App"></v-list-item>
                </template>

                <v-list-item v-for="([title, icon, path], i) in menuDataApp" :key="i" :prepend-icon="icon" :title="title"
                  :value="title" :to="path"></v-list-item>


              </v-list-group>
            </v-list>
            
            <v-list>
              <v-list-group value="Misc">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="Misc"></v-list-item>
                </template>

                <v-list-item v-for="([title, icon, mypath], i) in menuDataMisc" :key="i" :prepend-icon="icon" :title="title"
                  :value="title" :to="mypath"></v-list-item>
              </v-list-group>
            </v-list> 


          </v-navigation-drawer>

          <v-main style="height: 500px">
            <router-view />
            <v-card-text>

              The navigation drawer will appear from the bottom on smaller size screens.

            </v-card-text>
          </v-main>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>


<script setup>
import router from '@/router'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const routes = router.options.routes;
const props = defineProps({
  userId: Number,
})
const filteredItems = function (mykey) {
  let listpaths = routes.filter(item => {
    return item.name.toLowerCase() === mykey.toLowerCase()
  })
  //   console.log(listpaths);
  return listpaths
}

const goHome = ()=> {router.push('/')}

const drawer = ref(false);


console.log(routes);
const menuData = {
  open: ['Admin'],
  drawer: false,
  group: null,

  posts: [
    ['Add', 'mdi-message'],
  ],
  app: [
    ['Privacy', 'mdi-face-agent'],
    ['Contact', 'mdi-contacts'],
    ['About', 'mdi-help'],

  ],
  misc: [
    ['Update time', 'mdi-timer']
  ],
}

let f = filteredItems('app')
console.log("f=" + JSON.stringify(f))
// console.log("ee=" +f[0].children[0].path)
// console.log("ee=" +f[0].children[1].path)

const menuDataApp = menuData.app.map((elem, index) => { return [...elem, f[0].path + '/' + f[0].children[index].path] })
f = filteredItems('manage')
console.log("f pos=" + JSON.stringify(f))
const menuDataPosts = menuData.posts.map((elem, index) => { 
   
        return [...elem, f[0].path + '/' + f[0].children[index].path ]
       })

    /*
        let p = f[0].children[index].path
        let pathmenu = p.replace(":userId", "121")
*/

f = filteredItems('misc')
const menuDataMisc = menuData.misc.map((elem, index) => { return [...elem, f[0].path + '/' + f[0].children[index].path] })


// console.log("menuData2=" + JSON.stringify(menuDataApp))

// console.log("menuData=" + JSON.stringify(menuData))


</script>


<style>
.v-toolbar-title {
  :hover{
  cursor: pointer;
  }
}
</style>
