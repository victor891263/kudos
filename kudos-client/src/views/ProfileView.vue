<template>
    <FullScreen>
        <div v-if="currentProfile.data" class='profile-view'>
            <div class='core'>
                <img v-if="currentProfile.data?.img" :src="currentProfile.data?.img" class='anonymous'/>
                <AnonymousComponent v-else class='anonymous'/>
                <span class='username'>{{ currentProfile.data?.name }}</span>
                <div class='connection-status'>
                    <div :class="{ online: currentProfile.data?.status === 'online' }" />
                    <span>{{ statusLabel }}</span>
                </div>
            </div>
            <div class='attributes'>
                <span>Joined on {{
                        new Date(currentProfile.data?.createdAt).toLocaleDateString(undefined, {dateStyle: 'medium'})
                    }}</span>
                <span v-if="currentProfile.data?.link">{{ currentProfile.data?.link }}</span>
            </div>
            <p v-if="currentProfile.data?.about">{{ currentProfile.data?.about }}</p>
            <div v-if="self" class='edit-buttons'>
                <router-link :to="{ name: 'editProfile' }"><button class='one'>Edit profile</button></router-link>
                <button @click="logOut" class='two'>Log out</button>
            </div>
        </div>
        <div v-else-if="currentProfile.error" id='view-profile-error'>
            <h2>Error</h2>
            <p>Failed to load requested data. Reason: {{ currentProfile.error }}</p>
        </div>
        <span v-else id='view-profile-loading'>Loading...</span>
    </FullScreen>
</template>


<script setup lang='ts'>
import {computed, defineProps, onBeforeMount, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { socket, currentUser, currentProfile } from '@/store/misc'
import FullScreen from '@/components/FullScreen.vue'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import IUser from '@/types/user'
import IResponse from '@/types/response'
import calcTime from '@/utilities/calcTime'

const props = defineProps<{
    self?: boolean
}>()

const router = useRouter()
const route = useRoute()
const userId = props.self ? currentUser.value?._id : route.params.id

socket.value?.emit('client:get-user', userId, (response: IResponse<IUser>) => {
    currentProfile.value = response
})

const statusLabel = computed(() => {
    if (!currentProfile.value.data) return ''
    if (currentProfile.value.data.status === 'online') return 'online'
    if (calcTime(currentProfile.value.data.updatedAt) === 'Now') return 'seen just now'
    return `seen ${calcTime(currentProfile.value.data.updatedAt)} ago`
})

function clearProfile() {
    currentProfile.value = {
        data: undefined,
        error: ''
    }
}

function logOut() {
    // remove json web token from local storage
    localStorage.removeItem('kudos-app:token')

    // break socket connection
    socket.value?.disconnect()

    // set socket variable to undefined which is the initial value before a user is logged in
    socket.value = undefined

    // redirect to home page
    router.push({ name: 'home' })
}

// metadata
onBeforeMount(() => {
    if (!self) document.title = `${currentUser.value?.name} / Kudos`
})
</script>


<style>
@import '../styles/profile.css';

#view-profile-error {
    margin: auto;
}

#view-profile-error h2 {
    margin-bottom: 0.8rem;
}

#view-profile-loading {
    font-size: 1.4rem;
    font-weight: 700;
    margin: auto;
}
</style>