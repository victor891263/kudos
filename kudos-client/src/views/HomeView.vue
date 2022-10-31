<template>
  <div class='main'>
    <h1>Connect easily with anyone, any time</h1>
    <p>Kudos is an online chat web application that allows strangers to connect each other or create chat groups to have a conversation with like-minded individuals.</p>
    <div class='buttons'>
      <button class='one'>
        <router-link :to="{ name: 'signup' }">Sign up</router-link>
      </button>
      <button class='two'>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </button>
    </div>
  </div>
</template>

<style scoped>
.main {
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    width: min(100%, 500px);
}

h1 {
    margin-bottom: 1.4rem;
}

p {
    font-size: calc(1rem + 1px);
}

.buttons {
    display: grid !important;
    gap: 0.6rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2.2rem;
}

button {
    border-radius: 0.6rem;
}

button a {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.6rem;
    width: 100%;
}

button.one a {
    color: var(--white) !important;
}

button.two a {
    color: var(--violet-50) !important;
}
</style>