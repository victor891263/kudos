<template>
    <div id='recipient'>
        <div>
            <img v-if="recipient.img" :src="recipient.img" class='anonymous' />
            <AnonymousComponent v-else :is-group="recipient.isGroup" class='anonymous' />
            <div class='text'>
                <router-link :to="{ name: routeName, params: recipient.isGroup ? { groupId: recipient._id } : { userId: recipient._id } }" class='username'>{{ recipient.name || '' }}</router-link>
                <div class='connection-status'>
                    <div :class="{ online: recipient.status.isOnline }" />
                    <span>{{ recipient.status.label }}</span>
                </div>
            </div>
        </div>
        <button @click="onPress" class='back-button'><RightArrowIcon/></button>
    </div>
</template>

<script setup lang='ts'>
import {computed, onBeforeMount} from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, currentChat } from '@/store/misc'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import RightArrowIcon from '@/icons/RightArrowIcon.vue'
import returnRecipient from '@/utilities/returnRecipient'
import IRecipient from '@/types/recipient'

const router = useRouter()

const recipient = computed<IRecipient>(() => returnRecipient(currentChat.value!, currentUser.value!))
const routeName = computed(() => {
    if (currentChat.value?.isGroup) return 'groupProfile'
    return 'userProfile'
})

function onPress() {
    if (router.options.history.state.back) router.go(-1)
    else router.push({ name: 'inbox' })
}

// metadata
onBeforeMount(() => {
    document.title = `${recipient.value.name} / Kudos`
})
</script>

<style>
#recipient {
    position: relative;
}

#recipient > div {
    align-items: center;
    align-self: center;
    flex-direction: row;
    padding: 0.9rem 1rem;
}

#recipient .anonymous {
    height: 2.6rem;
    width: 2.6rem;
}

#recipient .text {
    gap: 0.2rem;
    margin-left: 0.6rem;
}

#recipient .username {
    color: var(--gray-30) !important;
    font-weight: 700;
}

#recipient .connection-status {
    align-items: center;
    flex-direction: row;
    gap: 0.3rem;
}

#recipient .connection-status div {
    background-color: var(--red-60);
    border-radius: 50%;
    height: 0.55rem;
    margin-top: 0.2rem;
    width: 0.55rem;
}

#recipient .connection-status .online {
    background-color: var(--green-50);
}

#recipient .connection-status span {
    font-size: 0.9rem;
}

#recipient .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
}

#recipient .back-button svg {
    fill: var(--gray-50);
    height: 0.9rem;
    transform: rotate(180deg);
}

@media (min-width: 960px) {
    #recipient > div {
        align-self: initial;
    }

    #recipient .back-button {
        display: none;
    }
}
</style>