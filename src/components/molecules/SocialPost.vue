<template>
  <div class="SocialPost">
    <div class="header">
      <img class="avatar" :src="avatarSrc" @click="navigateToUser" />
      <div class="name">{{ username }} - {{ userId }} - {{ postId }}</div>
      <IconDelete @click="onDeleteClick" role="button" />
    </div>
    <div class="post" v-text="post"></div>
    <Suspense v-if="showComments">
      <SocialPostComments :postId="props.postId" @delete="onDeleteClick" />
      <template #fallback>
        fetching comments...
      </template>
    </Suspense>

    <div class="interactions">
      <IconHeart />
      {{ likes }}
      <TheButton
        @click="onShowCommentClick"
        
        width="auto"
        theme="dark"
        data-cy="showCommentsButton"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import SocialPostComments from './SocialPostComments.vue';
import IconHeart from '../icons/IconHeart.vue';
import IconDelete from '../icons/IconDelete.vue';
import TheButton from '../atoms/TheButton.vue';
import { useRouter } from 'vue-router';

const showComments = ref(false);
const onShowCommentClick = () => {
  
  showComments.value = !showComments.value;
}

const props = defineProps({
  postId: String,
  username: String,
 // id: String,
  avatarSrc: String,
  post: String,
  likes: Number,
  userId: Number
});

const router = useRouter();
const navigateToUser = () => {
  router.push({
    name: "user",
    params: {
      userId: props.userId +1
    }
  });
}
onMounted(() => {
  // console.log(props.username);
  // console.log(props.userId);

});

const emit = defineEmits(['delete']);

const onDeleteClick = () => {
  emit('delete');
}
</script>

<style lang="scss">
.SocialPost {
  margin-bottom: 16px;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    ;
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    ;
    margin-right: 12px;
  }

  .name {
    font-weight: bold;
    margin-right: 8px;
    color: white;
  }

  .interactions {
    display: flex;
    font-weight: bold;
    margin-top: 8px;
    gap: 8px;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: var(--color-input-soft);
    cursor: pointer;
  }
}
</style>