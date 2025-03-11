<template>
    <aside :class="{ 'sidebar__closed': sidebarStore.closed }">
        <template v-if="sidebarStore.closed">
            <IconRightArrow class="sidebar__icon" @click="sidebarStore.toggleSidebar()" />
        </template>
        <template v-else>
            <h2>Sidebar</h2>
            <IconLeftArrow class="sidebar__icon" @click="sidebarStore.toggleSidebar()" />
            <template v-if="visibilityStore.closed">
                <TheButton @click="visibilityStore.toggleForm()">Create post</TheButton>
            </template>
            <template v-else>
                <TheButton @click="visibilityStore.toggleForm()">Close form</TheButton>
                <CreatePost v-show="!visibilityStore.closed"/>
            </template>
            <div>
                Current time: {{ currentTime }}
            </div>
            <TheButton @click="onUpdateTimeClick">Update Time</TheButton>
            <router-link to="contact">Contact</router-link>
            <a @click="navigateToPrivacy">Programmatic to privacy</a>
            <router-link to="about">About</router-link>
        </template>
    </aside>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import TheButton from '../atoms/TheButton.vue'
import CreatePost from '../molecules/CreatePost.vue';
import IconLeftArrow from '../icons/IconLeftArrow.vue'
import IconRightArrow from '../icons/IconRightArrow.vue'
import { RouterLink, useRouter } from 'vue-router';
import { useSidebarStore } from '../../stores/sidebar';
import { usePostsStore } from '../../stores/posts';
import { useVisibilityStore } from '../../stores/visibility';

const currentTime = ref(new Date().toLocaleTimeString());
const texareaRef = ref(null)
//const closed = ref(false);
const sidebarStore = useSidebarStore()
const visibilityStore = useVisibilityStore()


// const toggleSidebar = () => {
//     closed.value = !closed.value;
//     window.localStorage.setItem("sidebar", closed.value);
// }

const onUpdateTimeClick = () => {
    currentTime.value = new Date().toLocaleTimeString();
};

const router = useRouter();

const navigateToPrivacy = (event) => {
    event.preventDefault();
    console.log("Run a side effect");
    router.push("privacy");
}

onBeforeMount(async () => {
    // const sidebarState = window.localStorage.getItem("sidebar");
    // closed.value = sidebarState === "true";
    sidebarStore.loadSidebarFromLocalStorage()
    visibilityStore.loadFormFromLocalStorage()

});
</script>
<style scoped>
aside {
    display: flex;
    flex-direction: column;
    position: relative;

    &.sidebar__closed {
        width: 40px;
    }

    .sidebar__icon {
        position: absolute;
        right: 12px;
        top: 22px;
        cursor: pointer;
    }
}
</style>