<template>
    <Form @submit="onSubmit">
        <label for="email">Enter your email</label>
        <Field id="email" type="email" name="email" value="test@re.com"></Field>
       
        <label for="message">Message</label>
        <Field id="message" as="textarea" name="message" value="Message"></Field>
        <TheButton :type="'submit'">Send</TheButton>
    </Form>
</template>
<script setup>
import { onMounted, ref} from 'vue';
import TheButton from '../atoms/TheButton.vue';
import { usePostsStore} from '../../stores/posts';
import { useVisibilityStore } from '../../stores/visibility';
import { Form, Field } from 'vee-validate';
import { useRouter } from 'vue-router';

const textareaRef = ref(null);
const createPostForm = ref(null);
const postText = ref("Value to add");


const postsStore = usePostsStore()
const visibilityStore = useVisibilityStore()

const { addPost} =  postsStore
const router = useRouter();

const createPost = (event) =>{
    event.preventDefault();
    if(createPostForm.value.reportValidity()){

    }
}

const onSubmit = (values) =>{
  console.log("send")
  console.log(JSON.stringify(values, null, 2));
  addPost(values.message)
  router.push('/')
    
}

// const createPostHandler = (event) => {
//     event.preventDefault();
//     if(createPostForm.value.reportValidity()){
//     //    addPost(textareaRef.value.value)
//         addPost(postText.value)
//         console.log("send")
//         router.push('/')
//         visibilityStore.toggleForm();

//     }
// }

onMounted(()=> {
   // textareaRef.value.focus()
   email.focus()
})
</script>
<style scoped>
Form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
    background-color: rgb(66, 58, 105);
}
input, textarea {
    border: 2px solid rgb(242, 255, 0);
    border-radius: 4px;
}

</style>