<template>
  <v-app>
  <v-card 
  >
    <v-row >
      <v-col>
      <v-app-bar color="primary" style="height: 67px;">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title >My files</v-toolbar-title>
        <!-- <v-app-bar-title>Photos</v-app-bar-title> -->
        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'top' : 'top'"
        temporary
        style="width: 300px;"
      >
        <v-list
          :items="items"
        ></v-list>


<v-list v-model:opened="open">
        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Admin"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
      </v-list>

      </v-navigation-drawer>

      <v-main style="height: 500px">
        <v-card-text>
          
          The navigation drawer will appear from the bottom on smaller size screens res.
        </v-card-text>
      </v-main>
    </v-col>
    </v-row>
  </v-card>
</v-app>
</template>

<!-- <template>
  <v-app>
    <router-view />
  </v-app>
</template> -->
<script>
  export default {
    data: () => ({
      open: ['Admin'],
      drawer: false,
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],

    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>