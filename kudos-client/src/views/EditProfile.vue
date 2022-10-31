<template>
    <FullScreen>
        <div class='edit-window'>
            <div v-if="operation.error" class='error-on-server'>
                <span>✖</span>
                <p>Failed to save changes. Reason: {{ operation.error }}</p>
            </div>
            <h2>Edit profile</h2>
            <div>
                <label>Social media link</label>
                <input v-model="link" type='text' placeholder="(optional)" class='text-input'/>
                <span v-if="errorOfInputs.link" class='validation-error'>✖ {{ errorOfInputs.link }}</span>
            </div>
            <div>
                <label>About you</label>
                <textarea v-model="about" placeholder="(optional)" class='text-input'/>
                <span v-if="errorOfInputs.about" class='validation-error'>✖ {{ errorOfInputs.about }}</span>
            </div>
            <button @click="saveChanges(link, about)" class='one button-with-spinner'>
                <span :class="{ hidden: operation.running }" >Save changes</span>
                <SpinnerComponent :class="{ hidden: !operation.running }" class='spinner' />
            </button>
        </div>
    </FullScreen>
</template>


<script setup lang='ts'>
import {onBeforeMount, reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import Joi from 'joi'
import { socket } from '@/store/misc'
import { currentProfile } from '@/store/misc'
import FullScreen from '@/components/FullScreen.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import useSocketOperation from '@/utilities/useSocketOperation'
import clearQuotes from '@/utilities/clearQuotes'

const link = ref(currentProfile.value.data?.link)
const about = ref(currentProfile.value.data?.about)

const errorOfInputs = ref({
    link: '',
    about: ''
})

const operation = reactive({
    running: false,
    error: ''
})

const router = useRouter()

const validationSchema = Joi.object({
    link: Joi.string().min(0).max(50),
    about: Joi.string().min(0).max(100)
})

function clearProfile() {
    currentProfile.value = {
        data: undefined,
        error: ''
    }
}

function saveChanges(newLink: string, newAbout: string) {
    // clear errors
    errorOfInputs.value = {
        link: '',
        about: ''
    }

    // validate if the message is in the right format
    const { error } = validationSchema.validate({ link: newLink, about: newAbout }, { abortEarly: false })
    if (error) {error.details.forEach(item => errorOfInputs.value[item.path[0]] = clearQuotes(item.message))}

    // save changes to server
    if (!error) {
        useSocketOperation((onError) => {
            socket.value?.emit('client:edit-user', currentProfile.value.data?._id, { link: newLink, about: newAbout }, onError)
        }, () => router.push({ name: 'inbox' }), operation)
    }
}

// metadata
onBeforeMount(() => {
    document.title = 'Edit account / Kudos'
})
</script>


<style>
@import '../styles/edit.css';
</style>