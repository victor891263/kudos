<template>
    <FullScreen>
        <div id='new-conversation' class='new-window'>
            <div v-if="operation.error" class='error-on-server'>
                <span>✖</span>
                <p>Failed to send message. Reason:  {{ operation.error }}</p>
            </div>
            <h2>Start a conversation</h2>
            <div class='recipient-selector'>
                <div class='recipient'>
                    <span>Recipient:</span>
                    <button v-if="recipient" @click="removeRecipient" class='removable-target one'>
                        <img v-if="recipient?.img" :src="recipient?.img" class='anonymous'/>
                        <AnonymousComponent v-else class='anonymous'/>
                        <span>{{ recipient?.name }}</span>
                        <span class='cross'>✖</span>
                    </button>
                    <span v-else class='no-recipient'>No user selected for recipient</span>
                </div>
                <div v-if="!recipient">
                    <SearchComponent v-if="!recipient" v-model="keywordForUser" :placeholder="'Find your recipient'" />
                    <span v-if="errorNoRecipient" class='validation-error'>✖ No recipient has been selected</span>
                </div>
                <div v-if="keywordForUser" class='msg-targets'>
                    <div v-if="filteredUsers.length > 0">
                        <button v-for="user in filteredUsers" @click="assignRecipient(user)" v-bind:key="user._id">
                            <img v-if="user.img" :src="user.img" class='anonymous'/>
                            <AnonymousComponent v-else class='anonymous'/>
                            <span>{{ user.name }}</span>
                        </button>
                    </div>
                    <span v-else>No users found</span>
                </div>
            </div>
            <div>
                <textarea v-model="message" placeholder="Type message here"/>
                <span v-if="errorNoMsg" class='validation-error'>✖ {{ errorNoMsg }}</span>
            </div>
            <ButtonWithSpinner :handleClick="() => createConversation(false, recipient, message)" :isLoading="operation.running" label="Create conversation" />
        </div>
    </FullScreen>
</template>

<script setup lang='ts'>
import {computed, onBeforeMount, reactive, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import Joi from 'joi'
import { users } from '@/store/serverResponse'
import { socket } from '@/store/misc'
import FullScreen from '@/components/FullScreen.vue'
import ButtonWithSpinner from '@/components/ButtonWithSpinner.vue'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import useSocketOperation from '@/utilities/useSocketOperation'
import clearQuotes from '@/utilities/clearQuotes'
import IUser from '@/types/user'

const router = useRouter()

const keywordForUser = ref('')
const recipient = ref<IUser>()
const message = ref('')

const errorNoMsg = ref('')
const errorNoRecipient = ref(false)

const operation = reactive({
    running: false,
    error: ''
})

watch(message, () => errorNoMsg.value = '')
watch(keywordForUser, () => errorNoRecipient.value = false)

const filteredUsers = computed(() => users.value.data.filter(user => user.name.toLowerCase().includes(keywordForUser.value.toLowerCase())))

const validationSchema = Joi.object({
    message: Joi.string().min(1).max(100).required()
})

function assignRecipient(user: IUser) {
    recipient.value = user
    keywordForUser.value = ''
}

function removeRecipient() {
    recipient.value = undefined
}

function createConversation(isGroup: boolean, targetUser: IUser, msg: string) {
    // remove all errors
    errorNoMsg.value = ''
    errorNoRecipient.value = false

    // validate if the message is in the right format
    const { error } = validationSchema.validate({ message: msg })
    if (error) errorNoMsg.value = clearQuotes(error.details[0].message)

    // check if recipient has been selected
    if (!targetUser) errorNoRecipient.value = true

    // send data to server if no errors are present
    if ((!errorNoMsg.value) && (!errorNoRecipient.value)) {
        useSocketOperation((onError) => {
            socket.value!.emit('client:post-chat', {
                isGroup,
                members: [targetUser._id],
                message: msg
            }, onError)
        },() => router.push({ name: 'inbox' }) , operation)
    }
}

// metadata
onBeforeMount(() => {
    document.title = 'New chat / Kudos'
})
</script>

<style>
@import '../styles/window.css';

#new-conversation .recipient-selector {
    border: 2px solid var(--gray-70);
    border-radius: 1rem;
    gap: 0.8rem;
    padding: 0.8rem;
}

#new-conversation .recipient {
    align-items: center;
    flex-direction: row;
    gap: 0.4rem;
}

#new-conversation .no-recipient {
    color: var(--gray-50);
}
</style>