<template>
    <Form ref="createPostForm" @submit="handleSubmit">
        <!-- <label for="post">Enter your post body:</label> -->
        <Field id="email" type="email" name="email" value="ujj"></Field>
       
        <label for="message">Message</label>
        <Field id="message" as="textarea" name="message">Message</Field>
        <TheButton>Send</TheButton>
    </Form>
</template>
<script setup>
import { onMounted, ref} from 'vue';
import TheButton from '../atoms/TheButton.vue';
import { usePostsStore} from '../../stores/posts';
import { useVisibilityStore } from '../../stores/visibility';
import { Form, Field } from 'vee-validate';

const textareaRef = ref(null);
const createPostForm = ref(null);
const postText = ref("Value to add");


const postsStore = usePostsStore()
const visibilityStore = useVisibilityStore()

const { addPost} =  postsStore

const createPost = (event) =>{
    event.preventDefault();
    if(createPostForm.value.reportValidity()){

    }
}

const handleSubmit = ({email, message}) =>{
   console.log("email:", email)
   console.log("message:", message)

}

const createPostHandler = (event) => {
    event.preventDefault();
    if(createPostForm.value.reportValidity()){
    //    addPost(textareaRef.value.value)
        addPost(postText.value)
        visibilityStore.toggleForm();

    }
}

onMounted(()=> {
   // textareaRef.value.focus()
   message.focus()
})
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
}
</style>