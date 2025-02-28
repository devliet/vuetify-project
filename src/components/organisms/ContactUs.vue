<template>
 <Form  @submit="handleSubmit" :validation-schema="schema"  v-slot="{ values, validate }">
    <Field name="email2" id="email2" type="email" value="" />
    <ErrorMessage name="email2" class="error"/>

    <Field name="password" id="password2" type="password" value="" />
    <ErrorMessage name="password" />

    <!-- <pre>{{ values }}</pre> -->

    <TheButton>Send</TheButton>
    <TheButton @click="myFunction()" type="button">not submit</TheButton>
    
    <TheButton type="button" @click="validate">Validate only</TheButton>
    <TheButton type="reset">Reset</TheButton>
  </Form>

   
</template>

<script setup>
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import * as yup from 'yup';
//const validateEmail = yup.string().required().email();

import TheButton from '../atoms/TheButton.vue';
import { required, email, min } from '@vee-validate/rules';
import { ref} from 'vue';

// defineRule('required', value => {
//     if(!value || !value.length){
//         return 'This field is required';
//     }
//     return true;
// })
const schema = yup.object({
  email2: yup.string().required().email(),
  password: yup.string().required().min(8),
});



defineRule('required', required);
//defineRule('email', email);
defineRule('min', min);

const myFunction = () => {
    console.log("val:",  values.email2)
    console.log("pass:", values.password2)
  //  return false

}

// function myFunction(){
//     console.log("not submitting")
// }

function onSubmit2(values){
    alert(JSON.stringify(values, null, 2));
}

// const handleSubmit = ({ email, message }) => {
//     console.log("email:", email)
//     console.log("message:", message)

// }

function handleSubmit(values){
    alert(JSON.stringify(values, null, 2));
    console.log(values.email2)
}

</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    width: 60%;
}

.error {
    color: red;
    font-weight: bold;
}
</style>