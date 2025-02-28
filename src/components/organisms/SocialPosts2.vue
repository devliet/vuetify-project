
<template>
  <div>
    <ul>
      <li v-for="(item, index) in fields1.posts" :key="item.id">
        
        {{ item.reactions }}  
        {{  index }}
       
        <div v-if="fields2.results" >
           {{ fields2.results[index].login.uuid }}
        </div>
       
      
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const items = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fields1 = ref([]);
  const fields2 =  ref([]);
  const fields3 =ref([]);

 const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts?limit=5&select=userId,body,reactions,views');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        fields1.value = data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }

      try {
        const response = await fetch('https://randomuser.me/api/?inc=login,picture&results=5');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        fields2.value = data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }


    };

    onMounted(fetchData);

    return {
      fields1,
      fields2,
      error,
    };

  },

  // computed: {
  //   filteredItems(index  ) {
  //     return this.fields2.results[index].login
  //   }}


};
</script>