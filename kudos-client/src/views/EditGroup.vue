<template>
    <FullScreen>
        <div class='edit-window'>
            <div v-if="operation.error" class='error-on-server'>
                <span>✖</span>
                <p>Failed to save changes. Reason:  {{ operation.error }}</p>
            </div>
            <h2>Edit group</h2>
            <div>
                <label>Group description</label>
                <textarea v-model="description" placeholder="(optional)" class='text-input'/>
                <span v-if="errorOfInputs.description" class='validation-error'>✖ {{ errorOfInputs.description }}</span>
            </div>
            <ButtonWithSpinner :handleClick="() => saveChanges(description)" :isLoading="operation.running" label="Save changes" />
        </div>
    </FullScreen>
</template>


<script setup lang='ts'>
import {onBeforeMount, reactive, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Joi from 'joi'
import { chats } from '@/store/serverResponse'
import { socket } from '@/store/misc'
import FullScreen from '@/components/FullScreen.vue'
import ButtonWithSpinner from '@/components/ButtonWithSpinner.vue'
import clearQuotes from '@/utilities/clearQuotes'
import useSocketOperation from '@/utilities/useSocketOperation'
import IChat from '@/types/chat'

const route = useRoute()
const groupId = route.params.groupId

const group = ref<IChat>(chats.value.data.find(chat => chat._id === groupId)!)

const description = ref(group.value.description || '')

const errorOfInputs = ref({
    description: ''
})

const operation = reactive({
    running: false,
    error: ''
})

const router = useRouter()

const validationSchema = Joi.object({
    description: Joi.string().min(0).max(100)
})

function saveChanges(newDescription: string) {
    // clear errors
    errorOfInputs.value = {
        description: ''
    }

    // validate if the message is in the right format
    const { error } = validationSchema.validate({ description: newDescription }, { abortEarly: false })
    if (error) {error.details.forEach(item => errorOfInputs.value[item.path[0]] = clearQuotes(item.message))}

    // save changes to server
    if (!error) {
        useSocketOperation((onError) => {
            socket.value?.emit('client:edit-group', group.value._id, { description: newDescription }, onError)
        }, () => router.push({ name: 'inbox' }), operation)
    }
}

// metadata
onBeforeMount(() => {
    document.title = `Edit ${group.value.name} / Kudos`
})
</script>


<style>
@import '../styles/edit.css';
</style>