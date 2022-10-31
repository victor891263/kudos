<template>
    <FullScreen>
        <div class='profile-view'>
            <div v-if="operation.error" class='error-on-server'>
                <span>✖</span>
                <p>Failed to leave group. Reason: {{ operation.error }}</p>
            </div>
            <div class='core'>
                <img v-if="group.img" :src="group.img" class='anonymous'/>
                <AnonymousComponent v-else :is-group="true" class='anonymous'/>
                <span class='username'>{{ group.name }}</span>
                <div class='connection-status'>
                    <div class='online' />
                    <span>{{ statusLabel }}</span>
                </div>
            </div>
            <div class='attributes'>
                <span>Created on {{ new Date(group.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) }}</span>
            </div>
            <p v-if="group.description">{{ group.description }}</p>
            <div class='group-members'>
                <h3>Members</h3>
                <div>
                    <router-link v-for="member in group.members" :to="{ name: 'userProfile', params: { id: member._id } }" v-bind:key="member._id">
                        <img v-if="member.img" :src="member.img"/>
                        <AnonymousComponent v-else class='anonymous'/>
                        <span>{{ member.name }}</span>
                    </router-link>
                </div>
            </div>
            <div class='edit-buttons'>
                <router-link :to="{ name: 'editGroup' }"><button class='one'>Edit group</button></router-link>
                <button @click="leaveGroup" class='two button-with-spinner'>
                    <span :class="{ hidden: operation.running }">Leave group</span>
                    <SpinnerComponent :class="{ hidden: !operation.running }" class='spinner' />
                </button>
            </div>
        </div>
    </FullScreen>
</template>

<script setup lang='ts'>
import {computed, onBeforeMount, reactive, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chats } from '@/store/serverResponse'
import { socket } from '@/store/misc'
import FullScreen from '@/components/FullScreen.vue'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import useSocketOperation from '@/utilities/useSocketOperation'
import IChat from '@/types/chat'

const operation = reactive({
    running: false,
    error: ''
})

const router = useRouter()
const route = useRoute()
const groupId = route.params.id

const group = ref<IChat>(chats.value.data.find(chat => chat._id === groupId)!)

const statusLabel = computed(() => {
    const onlineMembers = group.value.members.filter(member => member.status === 'online')
    return `${onlineMembers.length} users online`
})

function leaveGroup() {
    useSocketOperation((onError) => {
        socket.value!.emit('client:leave-group', groupId, onError)
    },() => router.push({ name: 'inbox' }) , operation)
}

// metadata
onBeforeMount(() => {
    document.title = `${group.value.name} / Kudos`
})
</script>

<style>
@import '../styles/profile.css';

.profile-view .group-members {
    border: 2px solid var(--gray-70);
    border-radius: 1rem;
    padding: 0.8rem;
    width: 100%;
}

.profile-view .group-members h3 {
    align-items: flex-start;
}

.profile-view .group-members > div {
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.profile-view .group-members > div > a {
    align-items: center;
    background-color: var(--gray-80);
    border-radius: 0.5rem;
    flex-direction: row !important;
    padding: 0.4rem 0.6rem 0.4rem 0.4rem;
    width: fit-content;
}

.profile-view .group-members > div > a span {
    font-size: 0.9rem;
    margin-left: 0.4rem;
}

.profile-view .group-members .anonymous {
    height: 1.2rem;
    width: 1.2rem;
}
</style>