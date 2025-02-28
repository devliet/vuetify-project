<template>
  <div class="SocialPostComments">
    <template v-if="comments.length === 0">
      <p>There are no comments for this post!</p>
    </template>
    <template v-else>
      <p>Comments:</p>
      <div v-for="(comment, index) in comments" class="comment">
        <p>{{ comment.user.username }}: <strong>{{ comment.body }}</strong></p>
      </div>
    </template>
  </div>
</template>
  
<script setup >
import { reactive } from 'vue';
const props = defineProps({
  postId: String,
});

const comments = reactive([]);

const fetchComments = (postId) => {
  const baseUrl = "https://dummyjson.com/comments/";
  return fetch(`${baseUrl}post/${props.postId}`,
 )
    .then( response => response.json())
    .then( result => {
     
      Object.assign(comments, result.comments);
     
    })
};
await fetchComments(props.postId);
</script>
  
<style lang="scss">
.SocialPostComments{
  padding-left:24px;
  p {
    font-weight: bold;
  }
  .comment {
    display:flex;
    justify-content: space-between;
    background-color: var(--color-input-mute);
    border-radius: 10px;
    margin-bottom: 8px;
    padding:8px 16px;
    color:var(--color-background-soft);
    width: 75%;
  }
  svg {
    fill:var(--color-background-mute);
  }
}
</style>