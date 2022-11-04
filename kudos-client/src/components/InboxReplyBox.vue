<template>
    <div id='reply-box'>
        <div>
            <input type='text' v-model="reply" placeholder="Type reply here" >
            <RightArrowIcon @click="sendMsg(reply, currentChat?._id)" v-if="!operation.running" class='arrow' />
            <SpinnerComponent v-if="operation.running" class='spinner' />
        </div>
        <span v-if="operation.error" class='validation-error'>✖ {{ operation.error }}</span>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { socket, currentChat } from '@/store/misc'
import useSocketOperation from '@/utilities/useSocketOperation'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import RightArrowIcon from '@/icons/RightArrowIcon.vue'

const reply = ref('')
const operation = reactive({
    running: false,
    error: ''
})

function sendMsg(message: string, chatId: string) {
    useSocketOperation((onError) => {
        socket.value!.emit('client:post-message', message, chatId, onError)
    }, () => reply.value = '', operation)
}
</script>

<style>
#reply-box {
    padding: 1rem;
}

#reply-box > div {
    align-items: center;
    background-color: var(--gray-70) !important;
    border: 2px solid transparent;
    border-radius: 0.7rem;
    flex-direction: row;
    transition: border-color 0.15s;
}

#reply-box > div:focus-within {
    border-color: var(--violet-50);
}

#reply-box input {
    background-color: transparent;
    border: none;
    font-weight: 500;
    outline: none;
    padding: 0.6rem 0.8rem;
    width: 100%;
}

#reply-box input::placeholder {
    color: var(--gray-50);
    font-weight: 500;
}

#reply-box .arrow {
    cursor: pointer;
    fill: var(--violet-50);
    flex-shrink: 0;
    height: 0.9rem;
    margin-right: 0.8rem;
}

#reply-box .spinner {
    border-color: var(--violet-50);
    flex-shrink: 0;
    height: 1.4rem;
    margin-right: 0.8rem;
    width: 1.4rem;
}

#reply-box .validation-error {
    margin-top: 0.2rem;
}
</style>