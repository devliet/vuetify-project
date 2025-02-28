<template>
  <p>infos post</p>
  <SocialPost v-for="(post, index) in posts" :username="post.username" :id="post.postId" :avatarSrc="post.avatarSrc"
    :post="post.post" :likes="post.likes" :key="post.postId"></SocialPost>
    <p>infos post end</p>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import SocialPost from '../components/molecules/SocialPost.vue'
import { useRoute } from 'vue-router';

const posts = reactive([]);
const fetchPosts = (userId) => {
  const baseUrl = "https://dummyjson.com";
  console.log("--"+`${baseUrl}/posts/user/${userId}`)
  fetch(`${baseUrl}/posts/user/${userId}`)

    .then(response => response.json())
    .then(result => {
      for (let index = 0; index <result.posts.length; index++) {
        console.log(index)
        posts.push({
          postId: result.posts[index].id.toString(),
          username: "Not specified",
          userId: "Not specified",
          avatarSrc: "Not specified",
          post: "Not specified",
          //   comments="fields3[index].body,
          likes: result.posts[index].reactions.likes,
          retweets: result.posts[index].reactions.dislikes,
          tags: result.posts[index].tags,

        })

      }
    })
}

const route = useRoute();
fetchPosts(route.params.userId);

</script>