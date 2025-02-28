<template>
  <!-- <SocialPost v-for="(post, index) in posts.value" :username="post.username" :postId="post.postId"
    :avatarSrc="post.avatarSrc" :post="post.post" :likes="post.likes" :key="post.postId" :userId="index"
    @delete="onDelete(index)"></SocialPost> -->
  <!-- substituting retweets -->
  <!-- vue 3 v-for across async fetch data -->
  <p>
    Social posts below
  </p>
  <div v-if="posts">
    <p>
      let's go
    </p>
    <SocialPost v-for="(post, index) in posts" :postId="post.postId" :username="post.username" :userId="post.userId"
      :avatarSrc="post.avatarSrc" :post="post.post" :likes="post.likes" :retweets="post.retweets" :key="post.postId"
      @delete="onDelete(index)"></SocialPost>

  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import SocialPost from '../molecules/SocialPost.vue';
import { usePostsStore } from '../../stores/posts';
import { storeToRefs } from 'pinia';

const postsStore = usePostsStore();

const onDelete = (postIndex) => {
  posts.value.splice(postIndex, 1);
}

// const posts = ref([]);
const { posts } = storeToRefs(postsStore);
const { fetchFields, removePost } = postsStore;

const fields1 = ref([]);
const fields2 = ref([]);
const fields3 = ref([]);

const skip = ref(0);
const limit = ref(5);
const secondRetrieve = ref(true)

watch(
  posts.value,
  (newValue, old) => {
    if (newValue.length < 4) {
      if (secondRetrieve.value) {
        skip.value = 5
        limit.value = 2
        secondRetrieve.value = false
      }
      else {
        skip.value += 2
      }


      fetchFields(true, skip, limit)
        .catch(error => {
          console.log("error promises from watch")
          console.log(error)
        })
    }
  }
)

onMounted(
  async () => {
    await fetchFields(true, skip, limit)
      .catch(error => {
        console.log("error promises")
        console.log(error)
      })
  }
)
</script>
