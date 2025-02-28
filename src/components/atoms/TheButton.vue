<template>
    <button
        :class="theme" :type="type"
    >
     <slot>Click Me</slot>
    </button>
</template>
<script setup>
defineProps({
    width: {
        type: String,
        default: "100px"
    },
    theme: {
        type: String,
        default: "light",
        validator: (value) => ["light", "dark"].includes(value)
    },
    type: {
        type: String,
        default: "button",
    }
})
</script>
<style scoped>
button {
    width: v-bind(width);
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
}
button:hover {
    background-color: #156ca1;
}
.light {
    background-color: #1DA1F2;
    color: white;
}
.dark {
    background-color: black;
    color: #1DA1F2;
    border:1px solid #1DA1F2;
}
.dark:hover{
    color: white;
}
</style>