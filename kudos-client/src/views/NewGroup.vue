<template>
    <FullScreen>
        <div id='new-group' class='new-window'>
            <div v-if="operation.error" class='error-server'>
                <span>✖</span>
                <p>Failed to create group. Reason:  {{ operation.error }}</p>
            </div>
            <h2>Create a group</h2>
            <div class='member-selector'>
                <div>
                    <div class='members'>
                        <h3>Members</h3>
                        <div v-if="members.length > 0">
                            <button v-for="member in members" @click="removeMember(member._id)" class='removable-target one' v-bind:key="member._id">
                                <img v-if="member.img" :src="member.img" class='anonymous'/>
                                <AnonymousComponent v-else class='anonymous'/>
                                <span>{{ member.name }}</span>
                                <span class='cross'>✖</span>
                            </button>
                        </div>
                        <span v-else>No user selected for recipient</span>
                    </div>
                    <div>
                        <SearchComponent v-model="keywordForUser" :placeholder="'Find user to add'" />
                        <span v-if="errorNoMember" class='error-validation'>✖ No members had been added</span>
                    </div>
                    <div v-if="keywordForUser" class='msg-targets'>
                        <div v-if="filteredUsers.length > 0">
                            <button v-for="user in filteredUsers" @click="addMember(user)" v-bind:key="user._id">
                                <img v-if="user.img" :src="user.img" class='anonymous'/>
                                <AnonymousComponent v-else class='anonymous'/>
                                <span>{{ user.name }}</span>
                            </button>
                        </div>
                        <span v-else>No users found</span>
                    </div>
                </div>
                <span v-if="errorMemberAlready" class='error-validation'>✖ This user has already been added</span>
            </div>
            <div>
                <input v-model="groupName" type='text' placeholder='Type group name here' class='text-input' />
                <span v-if="errorOfInputs.groupName" class='error-validation'>✖ {{ errorOfInputs.groupName }}</span>
            </div>
            <div>
                <input v-model="groupDescription" type='text' placeholder='Type group description here' class='text-input' />
                <span v-if="errorOfInputs.groupDescription" class='error-validation'>✖ {{ errorOfInputs.groupDescription }}</span>
            </div>
            <div>
                <textarea v-model="message" placeholder="Type the first message"/>
                <span v-if="errorOfInputs.message" class='error-validation'>✖ {{ errorOfInputs.message }}</span>
            </div>
            <button @click="createGroup(members, groupName, groupDescription, message)" class='one'>
                <span :class="{ hidden: operation.running }" >Create group</span>
                <SpinnerComponent :class="{ hidden: !operation.running }" class='spinner' />
            </button>
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
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import useSocketOperation from '@/utilities/useSocketOperation'
import clearQuotes from '@/utilities/clearQuotes'
import IUser from '@/types/user'

const router = useRouter()

const keywordForUser = ref('')
const members = ref<IUser[]>([])
const groupName = ref('')
const groupDescription = ref('')
const message = ref('')

const errorMemberAlready = ref(false)
const errorNoMember = ref(false)
const errorOfInputs = ref({
    groupName: '',
    groupDescription: '',
    message: ''
})

const operation = reactive({
    running: false,
    error: ''
})

watch(groupName, () => errorOfInputs.value.groupName = '')
watch(groupDescription, () => errorOfInputs.value.groupDescription = '')
watch(message, () => errorOfInputs.value.message = '')
watch(keywordForUser, () => {
    errorMemberAlready.value = false
    errorNoMember.value = false
})

const filteredUsers = computed(() => users.value.data.filter(user => user.name.toLowerCase().includes(keywordForUser.value.toLowerCase())))

const validationSchema = Joi.object({
    groupName: Joi.string().min(1).max(30).required(),
    groupDescription: Joi.string().min(1).max(100),
    message: Joi.string().min(1).max(100).required()
})

function addMember(user: IUser) {
    if (members.value.includes(user)) {
        errorMemberAlready.value = true
    } else {
        members.value.push(user)
        keywordForUser.value = ''
    }
}

function removeMember(userId: string) {
    members.value = members.value.filter(member => member._id !== userId)
}

function createGroup(gpMembers: IUser[], gpName: string, gpDesc: string, msg: string) {
    // remove all errors
    errorMemberAlready.value = false
    errorNoMember.value = false
    errorOfInputs.value = {
        groupName: '',
        groupDescription: '',
        message: ''
    }

    // validate if the message is in the right format
    const { error } = validationSchema.validate({ groupName: gpName, groupDescription: gpDesc, message: msg }, { abortEarly: false })
    if (error) {error.details.forEach(item => errorOfInputs.value[item.path[0]] = clearQuotes(item.message))}

    // check if members have been added
    if (gpMembers.length < 1) errorNoMember.value = true

    if ((!error) && (!errorNoMember.value)) {
        useSocketOperation((onError) => {
            socket.value?.emit('client:post-chat', {
                isGroup: true,
                name: gpName,
                members: gpMembers.map(member => member._id),
                message: msg,
                description: gpDesc,
                img: undefined
            }, onError)
        }, () => router.push({ name: 'inbox' }), operation)
    }
}

// metadata
onBeforeMount(() => {
    document.title = 'New group / Kudos'
})
</script>

<style>
@import '../styles/window.css';

#new-group .member-selector {
    border: 2px solid var(--gray-70);
    border-radius: 1rem;
    padding: 0.8rem;
}

#new-group .member-selector > div {
    gap: 0.8rem;
}

#new-group .members {
    gap: 0.4rem;
}

#new-group .members > div {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem;
}

#new-group .members > span {
    color: var(--gray-50);
}

#new-group .text-input {
    border-radius: 0.6rem;
    font-size: 15px;
    padding: 0.6rem 0.8rem;
}
</style>