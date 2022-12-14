<template>
    <FullScreen>
        <div id='join-group' class='new-window'>
            <div v-if="operation.error" class='error-on-server'>
                <span>✖</span>
                <p>Failed to send message. Reason:  {{ operation.error }}</p>
            </div>
            <h2>Join group</h2>
            <div class='recipient-selector'>
                <div class='recipient'>
                    <span>Group:</span>
                    <button v-if="recipient" @click="removeRecipient" class='removable-target one'>
                        <img v-if="recipient?.img" :src="recipient?.img" class='anonymous'/>
                        <AnonymousComponent v-else :isGroup="true" class='anonymous'/>
                        <span>{{ recipient?.name }}</span>
                        <span class='cross'>✖</span>
                    </button>
                    <span v-else class='no-recipient'>No group selected to join</span>
                </div>
                <div v-if="!recipient">
                    <SearchComponent v-if="!recipient" v-model="keywordForGroup" :placeholder="'Find group to join'" />
                    <span v-if="errorNoRecipient" class='validation-error'>✖ No recipient has been selected</span>
                </div>
                <div v-if="keywordForGroup" class='msg-targets'>
                    <div v-if="filteredGroups.length > 0">
                        <button v-for="user in filteredGroups" @click="assignRecipient(user)" v-bind:key="user._id">
                            <img v-if="user.img" :src="user.img" class='anonymous'/>
                            <AnonymousComponent v-else :isGroup="true" class='anonymous'/>
                            <span>{{ user.name }}</span>
                        </button>
                    </div>
                    <span v-else>No groups found</span>
                </div>
            </div>
            <ButtonWithSpinner :handleClick="() => joinGroup(recipient?._id)" :isLoading="operation.running" label="Join group" />
        </div>
    </FullScreen>
</template>

<script setup lang='ts'>
import {computed, onBeforeMount, reactive, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import { groups } from '@/store/serverResponse'
import { socket } from '@/store/misc'
import FullScreen from '@/components/FullScreen.vue'
import ButtonWithSpinner from '@/components/ButtonWithSpinner.vue'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import useSocketOperation from '@/utilities/useSocketOperation'
import IGroup from '@/types/group'

const router = useRouter()

const keywordForGroup = ref('')
const recipient = ref<IGroup>()

const errorNoRecipient = ref(false)

const operation = reactive({
    running: false,
    error: ''
})

const filteredGroups = computed(() => groups.value.data.filter(user => user.name.toLowerCase().includes(keywordForGroup.value.toLowerCase())))

watch(keywordForGroup, () => errorNoRecipient.value = false)

function assignRecipient(group: IGroup) {
    recipient.value = group
    keywordForGroup.value = ''
}

function removeRecipient() {
    recipient.value = undefined
}

function joinGroup(groupId: string) {
    // remove all errors
    errorNoRecipient.value = false

    // send data to server if a group has been selected
    if (groupId) {
        useSocketOperation((onError) => {
            socket.value?.emit('socket:join-group', groupId, onError)
        }, () => router.push({ name: 'inbox' }), operation)
    } else {
        errorNoRecipient.value = true
    }
}
</script>

<style>
@import '../styles/window.css';

#join-group .recipient-selector {
    gap: 0.8rem;
}

#join-group .recipient {
    align-items: center;
    flex-direction: row;
    gap: 0.4rem;
}

#join-group .no-recipient {
    color: var(--gray-50);
}
</style>