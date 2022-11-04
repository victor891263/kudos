<template>
    <span id='floating-logo'>Kudos</span>
    <div id='authentication'>
        <div v-if="operation.error" class='error-server'>
            <span>✖</span>
            <p>Failed to create your account. Reason: {{ operation.error }}</p>
        </div>
        <div class='heading'>
            <h1>Join Kudos</h1>
            <div class='subtitle'>
                <span>Already have an account?</span>
                <router-link :to="{ name: 'login' }">Login</router-link>
            </div>
        </div>
        <div>
            <input v-model='input.name' type='text' placeholder='Username' />
            <span v-show="errors.name" class='error-validation'>⨉ {{ errors.name }}</span>
        </div>
        <div>
            <input v-model='input.password' type='password' placeholder='Password' />
            <span v-show="errors.password" class='error-validation'>⨉ {{ errors.password }}</span>
        </div>
        <ButtonWithSpinner :handleClick="() => submit()" :isLoading="operation.running" label="Sign up" />
    </div>
    <span id='copyright'>© 2022 Kudos. All rights reserved.</span>
</template>


<script setup lang='ts'>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Joi from 'joi'
import ButtonWithSpinner from '@/components/ButtonWithSpinner.vue'
import useSubmit from '@/utilities/useSubmit'
import clearQuotes from '@/utilities/clearQuotes'

const input = reactive({
  name: '',
  password: ''
})

const operation = reactive({
  running: false,
  error: ''
})

const errors = reactive({
  name: '',
  password: ''
})

const router = useRouter()

const schema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  password: Joi.string().min(1).max(20).required()
})

watch(() => input.name, () => {
  errors.name = ''
})

watch(() => input.password, () => {
  errors.password = ''
})

function validate() {
  const { error } = schema.validate(input, { abortEarly: false })
  if (error) {error.details.forEach(item => errors[item.path[0]] = clearQuotes(item.message))}
  return error
}

async function submit() {
    const error = validate()
    if (!error) {
        operation.error = ''
        useSubmit(async () => {
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/signup`, input) // server will send back a json web token
            localStorage.setItem('kudos-app:token', response.data)
            router.push({ name: 'inbox' })
        }, operation)
    }
}
</script>


<style>
@import "../styles/authentication.css";
</style>