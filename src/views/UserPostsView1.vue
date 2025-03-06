<template>
    <div class="SocialPost">
      <div class="header">
        <img class="avatar" :src="avatarSrc" @click="navigateToUser" />
        <div class="name">{{ username }}</div>
        <IconDelete @click="onDeleteClick" role="button" />
      </div>
      <div class="post" v-text="post"></div>
      <Suspense v-if="showComments">
        <SocialPostComments :postId="props.id" @delete="onDelete" />
        <template #fallback>
          fetching comments...
        </template>
      </Suspense>
  
      <div class="interactions">
        <IconHeart />
        {{ likes }}
        <TheButton @click="onShowCommentClick" width="auto" theme="dark" data-cy="showCommentButton">Show comment
        </TheButton>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  import SocialPostComments from '../components/molecules/SocialPostComments.vue'
  import IconHeart from '../components/icons/IconHeart.vue';
  import IconDelete from '../components/icons/IconDelete.vue';
  import TheButton from '../components/atoms/TheButton.vue';
  import { useRouter } from 'vue-router';
  
  const showComments = ref(false);
  const onShowCommentClick = () => {
    console.log("Showing comments");
    showComments.value = !showComments.value;
  }

  const onDelete = () => {
  emit('delete');
}
  
  const props = defineProps({
    username: String,
    id: String,
    avatarSrc: String,
    post: String,
    likes: Number,
    userId: String
  });

  
  const router = useRouter();

  const navigateToUser = () => {
    router.push({
      name: "user",
      params: {
        userId: props.userId + 1
      }
    });
  }
  onMounted(() => {
    console.log(props.username);
    console.log(props.userId);
  
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