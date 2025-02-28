<template>
  <SocialPost
    v-for="(post, index) in posts"
    :username="post.username"
    :postId="post.postId"
    :avatarSrc="post.avatarSrc"
    :post="post.post"
    :likes="post.likes"
    :key="post.postId"
    :userId="index"
    @delete="onDelete(index)"
  ></SocialPost>
  <!-- substituting retweets -->
  <!-- vue 3 v-for across async fetch data -->
  <p>
    Social posts below
  </p>
  <div v-if="posts">
    <p>
      let's go
    </p>
    <!-- <SocialPost v-for="(post) in fields1.posts" :username="p" :userId="post.userId" :avatarSrc="p" :post="post.body"
      :comments="p" :likes="post.reactions.likes" :retweets="post.reactions.dislikes" :key="post.userId"
      @delete="onDelete(index)"></SocialPost> -->

    <!-- :comments="fields3[index].body" -->

    <SocialPost v-for="(post, index) in posts" :postId="post.postId" :username="post.username" :userId="post.userId"
      :avatarSrc="post.avatarSrc" :post="post.post" :likes="post.likes" :retweets="post.retweets" :key="post.postId"
      @delete="onDelete(index)"></SocialPost>

  </div>
</template>




<script setup>
  import { reactive, ref, watch, onMounted } from 'vue';
  import SocialPost from '../molecules/SocialPost.vue';
  import {usePostsStore} from '../../stores/posts';
  import { storeToRefs } from 'pinia';

  const postsStore = usePostsStore();

const onDelete = (postIndex) => {
  posts.value.splice(postIndex, 1);
}

// const posts = ref([]);
const posts = storeToRefs(postsStore);
const { fetchPosts, removePost} = postsStore;

const fields1 = ref([]);
const fields2 = ref([]);
const fields3 = ref([]);

const skip = ref(0);
const limit = ref(5);
const secondRetrieve = ref(true)

watch(
  posts.value,
   (newValue, old) => {
   // console.log(newValue.length + "xxxx")
    if (newValue.length < 4) {
      if (secondRetrieve.value) {
        skip.value = 5
        limit.value = 2
        secondRetrieve.value = false
      }
      else {
        skip.value += 2
      }

     
     fetchFields(skip, limit)
      .catch(error => {
        console.log("error promises from watch")
        console.log(error)
      })

 



    }
  }
)

async function fetchFields(skip, limit) {
  const [fields1Response, fields2Response, fields3Response] = await Promise.all([
    fetch(`https://dummyjson.com/posts?select=userId,body,reactions,views&skip=${skip.value}&limit=${limit.value}`),
    fetch(`https://dummyjson.com/users?select=username,image&skip=${skip.value}&limit=${limit.value}`),
 //   fetch(`https://dummyjson.com/comments?skip=${skip.value}&limit=${limit.value}`),
    fetch(`https://dummyjson.com/comments?limit=${limit.value}`),
  ])


  const fields11 = await fields1Response.json();
  //  fields1.value = fields11
  const fields22 = await fields2Response.json();
  //  fields2.value = fields22

  const fields33 = await fields3Response.json();
  //  fields3.value = fields33

  fields1.value = fields11.posts;
  fields2.value = fields22.users;
  fields3.value = fields33.comments;


  for (let index = 0; index <= limit.value-1; index++) {
    console.log(index)
    posts.value.push({
      postId: fields3.value[index].postId,
      username: fields2.value[index].username,
      userId: fields1.value[index].userId,
      avatarSrc: fields2.value[index].image,
      post: fields1.value[index].body,
      //   comments="fields3[index].body,
      likes: fields1.value.likes,
      retweets: fields1.value[index].reactions.dislikes,
      tags: fields1.value[index].tags

    })

  }

  // return [fields11, fields22, fields33];
}

onMounted(
  async () => {
    await fetchFields(skip, limit)
      .catch(error => {
        console.log("error promises")
        console.log(error)
      })
  }
)
</script>
